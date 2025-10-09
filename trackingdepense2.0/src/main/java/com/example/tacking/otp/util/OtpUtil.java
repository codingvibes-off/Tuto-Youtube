package com.example.tacking.otp.util;
import java.security.SecureRandom;

public class OtpUtil {
    private static final SecureRandom secureRandom = new SecureRandom();

    public static String generateOtp() {
        int otp = secureRandom.nextInt(9000) + 1000; // 1000-9999
        return String.valueOf(otp);
    }
}

