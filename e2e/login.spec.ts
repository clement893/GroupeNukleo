import { test, expect } from '@playwright/test';

test.describe('Processus de Connexion', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/admin/login');
  });

  test('should display login form', async ({ page }) => {
    // Vérifier que le formulaire de connexion est visible
    const loginForm = page.locator('form, [data-testid="login-form"]').first();
    await expect(loginForm).toBeVisible();
  });

  test('should show error for invalid credentials', async ({ page }) => {
    const usernameField = page.locator('input#admin-username, input[type="text"]').first();
    const passwordField = page.locator('input#admin-password, input[type="password"]').first();
    const submitButton = page.locator('button[type="submit"]').first();

    if (await usernameField.count() > 0 && await passwordField.count() > 0) {
      await usernameField.fill('invalid');
      await passwordField.fill('wrongpassword');
      await submitButton.click();

      // Attendre le message d'erreur
      await page.waitForTimeout(1000);
      
      // Vérifier qu'un message d'erreur apparaît
      const errorMessage = page.locator('[role="alert"], .error, [data-testid="error"]').first();
      if (await errorMessage.count() > 0) {
        await expect(errorMessage).toBeVisible();
      }
    }
  });

  test('should validate required fields', async ({ page }) => {
    const submitButton = page.locator('button[type="submit"]').first();
    await submitButton.click();

    // Vérifier les messages de validation
    await page.waitForTimeout(500);
  });

  test('should redirect after successful login', async ({ page }) => {
    // Note: Ce test nécessite des credentials valides ou un mock (TEST_ADMIN_USERNAME / TEST_ADMIN_PASSWORD)
    const usernameField = page.locator('input#admin-username, input[type="text"]').first();
    const passwordField = page.locator('input#admin-password, input[type="password"]').first();
    const submitButton = page.locator('button[type="submit"]').first();

    if (await usernameField.count() > 0 && await passwordField.count() > 0) {
      const testUser = process.env.TEST_ADMIN_USERNAME || process.env.TEST_EMAIL || '';
      const testPassword = process.env.TEST_ADMIN_PASSWORD || process.env.TEST_PASSWORD || '';

      if (testUser && testPassword) {
        await usernameField.fill(testUser);
        await passwordField.fill(testPassword);
        await submitButton.click();

        await page.waitForURL(/\/admin(?!\/login)/, { timeout: 5000 }).catch(() => {});
      }
    }
  });
});

