import { test, expect } from '@playwright/test';

test('Get By Role Practice - heading', async ({ page }) => {
  await page.goto('http://localhost:2930');
  const servicesHeading = page.getByRole('heading', { name: 'Our Services'})
  await expect(servicesHeading).toBeVisible()
});

test('Get By Role Practice - heading list call', async ({ page }) => {
  await page.goto('http://localhost:2930');
  const servicesHeadingList = page.getByRole('list')
  await expect(servicesHeadingList).toBeVisible()
  const servicesListItems =  await page.getByRole('listitem').all()
  for(const servicesListItem of servicesListItems){
    const itemText = await servicesListItem.textContent()
    await expect(itemText).toBeTruthy()
  }
});

test('Get By Role Buttons - Cookies', async ({ page }) => {
  await page.goto('http://localhost:2930');
  const button = page.getByRole("button" ,{name: "Accept"})
  await button.click()
  await expect(test).toBeTruthy()
});

test('Get By Role Buttons - FeedBack', async ({ page }) => {
  await page.goto('http://localhost:2930/FeedBackForm.html');
  const name =  page.getByRole('textbox' ,
    {name: "name"}
  )
  await name.fill("john")

  const email = await page.getByRole('textbox' ,
    {name: "email"}
  )
  await email.fill("john@gmail.com")

  const comment =  await page.getByRole("textbox" ,
    {name: "comment"}
  )
  comment.fill("lorem ipsum lorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsum")
  
  await expect(name).toHaveValue('john')
  await expect(email).toHaveValue("john@gmail.com")
  await expect(comment).toHaveValue("lorem ipsum lorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsum")
});
