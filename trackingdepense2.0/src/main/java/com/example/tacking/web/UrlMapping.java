package com.example.tacking.web;

public class UrlMapping {
    private UrlMapping() {
        throw new AssertionError("Cannot instantiate UrlMapping");
    }
    //API BASE PATH
    public static final String API_BASE_PATH = "/api";
    //USER
    public static final String USER = "/user";
    public static final String LOGIN = "/login";
    public static final String LOGOUT = "/logout";
    public static final String REFRESH = "/refresh";
    public static final String REGISTER = "/register";
    public static final String UPDATE = "/update";
    public static final String OTP = "/otp";
    public static final String CHECK = "/check";
    public static final String CODE = "/{code}";
    //EXPENSE
    public static final String EXPENSE = "/expense";
    //Category 
    public static final String CATEGORY = "/category";






}
