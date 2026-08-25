#!/usr/bin/env python3
"""
Générateur de données de test en masse pour la skill test-data-factory.

Pour chaque ligne générée, chaque champ reçoit aléatoirement une valeur
valide, limite (edge case) ou invalide, selon la distribution --ratio.

Dépendance : Faker (pip install faker)

Exemples :
    python generate_data.py --count 200 --fields email,prenom,telephone,date_naissance
    python generate_data.py --count 500 --fields email,montant --format csv --out data.csv
    python generate_data.py --count 100 --fields email,nom --seed 42
"""

import argparse
import csv
import json
import random
import string
import sys
from datetime import date, timedelta

try:
    from faker import Faker
except ImportError:
    print("Ce script nécessite Faker : pip install faker", file=sys.stderr)
    sys.exit(1)

fake = Faker("fr_FR")

CATEGORIES = ["valid", "edge", "invalid"]


# ---------------------------------------------------------------------------
# Générateurs par champ : chacun retourne (valid, edge, invalid)
# ---------------------------------------------------------------------------

def gen_email():
    local = fake.user_name()
    valid = f"{local}+test@{fake.free_email_domain()}"
    edge = f"élise.o'brien@sous-domaine.{fake.domain_word()}-tres-long-domaine-de-test.com"
    invalid = random.choice([
        f"{local} at {fake.free_email_domain()}",
        f"{local}{fake.free_email_domain()}",
        f"{local}@",
    ])
    return valid, edge, invalid


def gen_prenom():
    valid = fake.first_name()
    edge = random.choice(["Jean-Pierre", "Éléonore", "O'Brien", "É"])
    invalid = random.choice(["", "1234", "   "])
    return valid, edge, invalid


def gen_nom():
    valid = fake.last_name()
    edge = random.choice(["O'Connor-Lefèvre", "Nguyễn", "D'Angelo", "X"])
    invalid = random.choice(["", "42", "<script>alert(1)</script>"])
    return valid, edge, invalid


def gen_telephone():
    valid = fake.phone_number()
    edge = "+33 6 " + " ".join(
        "".join(random.choices(string.digits, k=2)) for _ in range(4)
    )
    invalid = random.choice(["123", "abcdefgh", "06-XX-YY-ZZ"])
    return valid, edge, invalid


def gen_date_naissance():
    today = date.today()
    valid = fake.date_of_birth(minimum_age=18, maximum_age=65).isoformat()
    edge = random.choice([
        today.isoformat(),
        (today - timedelta(days=18 * 365)).isoformat(),
    ])
    invalid = random.choice(["31/02/2026", "2099-01-01", "0000-00-00"])
    return valid, edge, invalid


def gen_montant():
    valid = round(random.uniform(5, 500), 2)
    edge = random.choice([0, -1, 999999.999, 0.001])
    invalid = random.choice(["abc", "dix euros", None])
    return valid, edge, invalid


def gen_password():
    valid = fake.password(length=12, special_chars=True, digits=True, upper_case=True, lower_case=True)
    edge = random.choice([
        fake.password(length=64, special_chars=True, digits=True, upper_case=True, lower_case=True),
        "Tr3s#Löng_MotDePasseÀvecÉmoji🔐",
        "12345678",
        "        ",
    ])
    invalid = random.choice(["", " ", "ab", "' OR 1=1 --"])
    return valid, edge, invalid


def gen_texte():
    valid = fake.sentence(nb_words=8)
    edge = random.choice([
        "🚀" * 20 + " texte avec emojis",
        "A" * 5000,
        "<script>alert('xss')</script>",
        "' OR 1=1 --",
    ])
    invalid = ""
    return valid, edge, invalid


FIELD_GENERATORS = {
    "email": gen_email,
    "prenom": gen_prenom,
    "nom": gen_nom,
    "telephone": gen_telephone,
    "date_naissance": gen_date_naissance,
    "montant": gen_montant,
    "texte": gen_texte,
    "password": gen_password,
}


def pick_category(ratio):
    return random.choices(CATEGORIES, weights=ratio, k=1)[0]


def generate_rows(fields, count, ratio):
    rows = []
    for _ in range(count):
        row = {}
        for field in fields:
            generator = FIELD_GENERATORS[field]
            valid, edge, invalid = generator()
            category = pick_category(ratio)
            value = {"valid": valid, "edge": edge, "invalid": invalid}[category]
            row[field] = value
            row[f"{field}_category"] = category
        rows.append(row)
    return rows


def write_json(rows, out):
    json.dump(rows, out, ensure_ascii=False, indent=2, default=str)
    out.write("\n")


def write_csv(rows, out, fieldnames):
    writer = csv.DictWriter(out, fieldnames=fieldnames)
    writer.writeheader()
    writer.writerows(rows)


def main():
    parser = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    parser.add_argument("--count", type=int, default=100, help="Nombre de lignes à générer (défaut: 100)")
    parser.add_argument(
        "--fields",
        type=str,
        required=True,
        help=f"Liste de champs séparés par des virgules parmi: {', '.join(FIELD_GENERATORS)}",
    )
    parser.add_argument("--format", choices=["json", "csv"], default="json", help="Format de sortie (défaut: json)")
    parser.add_argument("--out", type=str, default=None, help="Fichier de sortie (défaut: stdout)")
    parser.add_argument(
        "--ratio",
        type=str,
        default="60,25,15",
        help="Répartition valid,edge,invalid en pourcentage (défaut: 60,25,15)",
    )
    parser.add_argument("--seed", type=int, default=None, help="Seed aléatoire pour reproductibilité")

    args = parser.parse_args()

    fields = [f.strip() for f in args.fields.split(",") if f.strip()]
    unknown = [f for f in fields if f not in FIELD_GENERATORS]
    if unknown:
        parser.error(f"Champs inconnus: {', '.join(unknown)}. Disponibles: {', '.join(FIELD_GENERATORS)}")

    ratio = [float(x) for x in args.ratio.split(",")]
    if len(ratio) != 3:
        parser.error("--ratio doit contenir exactement 3 valeurs: valid,edge,invalid")

    if args.seed is not None:
        random.seed(args.seed)
        Faker.seed(args.seed)

    rows = generate_rows(fields, args.count, ratio)

    out = open(args.out, "w", newline="", encoding="utf-8") if args.out else sys.stdout
    try:
        if args.format == "json":
            write_json(rows, out)
        else:
            fieldnames = list(rows[0].keys()) if rows else fields
            write_csv(rows, out, fieldnames)
    finally:
        if args.out:
            out.close()


if __name__ == "__main__":
    main()
