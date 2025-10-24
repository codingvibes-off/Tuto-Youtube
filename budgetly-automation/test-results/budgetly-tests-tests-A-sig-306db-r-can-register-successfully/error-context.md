# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - generic [ref=e6]:
    - heading "Sign In" [level=2] [ref=e7]
    - paragraph [ref=e8]: Welcome back, you’ve been missed!
    - generic [ref=e9]:
      - generic [ref=e10]: Email
      - textbox "Email" [ref=e11]:
        - /placeholder: Enter your email
    - generic [ref=e12]:
      - generic [ref=e13]: Password
      - textbox "Password" [ref=e14]:
        - /placeholder: Enter your password
      - generic [ref=e15]: Forgot Password?
    - button "Login" [disabled] [ref=e16]
    - generic [ref=e17]:
      - separator [ref=e18]
      - generic [ref=e19]: Or
      - separator [ref=e20]
    - generic [ref=e21]:
      - button "Google" [ref=e22] [cursor=pointer]:
        - img "Google" [ref=e23]
      - button "Apple" [ref=e25] [cursor=pointer]:
        - img "Apple" [ref=e26]
      - button "Facebook" [ref=e28] [cursor=pointer]:
        - img "Facebook" [ref=e29]
    - paragraph [ref=e31]:
      - text: Don’t have an account?
      - link "Sign up for free" [ref=e32] [cursor=pointer]:
        - /url: /register
  - generic [ref=e33]: Subscription successful! An OTP has been sent to your email.!
```