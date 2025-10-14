package com.example.tacking.util;

import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.util.UUID;

import org.springframework.security.test.context.support.WithSecurityContext;
import java.lang.annotation.*;

@Target({ ElementType.METHOD, ElementType.TYPE })
@Retention(RetentionPolicy.RUNTIME)
@Documented
@WithSecurityContext(factory = WithMockTrackingApiSecurityContextFactory.class)
public @interface WithMockTrackingUser {
    String email() default "user@example.com";
    long id() default 1L;
}
