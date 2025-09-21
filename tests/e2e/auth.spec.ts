import { test, expect } from "@playwright/test"

test.describe("Authentication", () => {
  test("should login as employee and access dashboard", async ({ page }) => {
    await page.goto("/auth/signin")

    // Fill login form
    await page.fill('input[type="email"]', "john.doe@company.com")
    await page.fill('input[type="password"]', "demo123")
    await page.selectOption("select", "employee")

    // Submit form
    await page.click('button[type="submit"]')

    // Should redirect to employee dashboard
    await expect(page).toHaveURL("/dashboard/employee")
    await expect(page.locator("h1")).toContainText("Welcome back")
  })

  test("should login as admin and access admin dashboard", async ({ page }) => {
    await page.goto("/auth/signin")

    await page.fill('input[type="email"]', "admin@company.com")
    await page.fill('input[type="password"]', "admin123")
    await page.selectOption("select", "admin")

    await page.click('button[type="submit"]')

    await expect(page).toHaveURL("/dashboard/admin")
    await expect(page.locator("h1")).toContainText("Admin Dashboard")
  })

  test("should show error for invalid credentials", async ({ page }) => {
    await page.goto("/auth/signin")

    await page.fill('input[type="email"]', "invalid@example.com")
    await page.fill('input[type="password"]', "wrongpassword")
    await page.selectOption("select", "employee")

    await page.click('button[type="submit"]')

    await expect(page.locator('[role="alert"]')).toContainText("Invalid credentials")
  })
})
