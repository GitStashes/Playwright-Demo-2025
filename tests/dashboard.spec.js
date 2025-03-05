import {test, expect} from '@playwright/test';

test('test', async ({page}) => {
    //Login
    await page.goto('https://stage.brandmanager.tech/login');
    await page.getByRole('textbox', {name: 'Email address*'}).click();
    await page.getByRole('textbox', {name: 'Email address*'}).fill('editor.role100@clickoutmedia.com');
    await page.getByRole('textbox', {name: 'Password*'}).click();
    await page.getByRole('textbox', {name: 'Password*'}).fill('123');
    await page.getByRole('button', {name: 'Sign in'}).click();
    await expect(page.getByRole('complementary')).toContainText('BM Hub');

    //--Top navbar--
    //Dashboard title (Correct title and h1-class)
    await expect(page.locator('h1')).toContainText('Dashboard');
    //await expect(page.locator('h1')).toHaveClass('fi-header-heading');
    await expect(page.getByText('Staging')).toContainText('Staging');
    await expect(page.getByRole('searchbox', {name: 'Global search'})).toBeVisible();
    await expect(page.getByRole('button', {name: 'Open notifications'})).toBeVisible();
    await expect(page.getByRole('button', {name: 'User menu'})).toBeVisible();

    //Welcome Widget - Welcome text, Correct name (User role), Sign out button
    await expect(page.getByRole('main')).toContainText('Welcome');
    await expect(page.getByRole('paragraph')).toContainText('Nikola Editor (Editor)');
    await expect(page.getByRole('button', {name: 'Sign out'})).toBeVisible();


    //--Widgets--
    const widgets = page.locator('.overlook-link');

    const expectedWidgetNames = [
        'Brands', 'Offers', 'Campaigns', 'Cloaking Conditions', 'Websites'
    ]

    for (const [index, widgetNameText] of expectedWidgetNames.entries()) {
        const widgetName = widgets.nth(index).locator('span.overlook-name');
        const widgetCount = widgets.nth(index).locator('span.overlook-count');

        await expect(widgetName).toHaveText(widgetNameText);
        const countText = await widgetCount.textContent();
        await expect(Number(countText)).not.toBeNaN();
    }

    //--Tiles--
    const tilesCategories = page.locator('li[data-group-label="Categories"] ul.fi-sidebar-group-items li');
    const pageUrl = 'https://stage.brandmanager.tech';

    const expectedCategories = [
        {text: 'Websites', href: pageUrl + '/websites'},
        {text: 'Geos', href: pageUrl + '/geos'},
        {text: 'Verticals', href: pageUrl + '/verticals'},
        {text: 'Tags', href: pageUrl + '/tags'}
    ]

    for (const [index, expectedCategory] of expectedCategories.entries()) {

        const tileName = tilesCategories.nth(index).locator('a span');
        const tileUrl = tilesCategories.nth(index).locator('a');

        await expect(tileName).toContainText(expectedCategory.text);
        await expect(tileUrl).toHaveAttribute('href', expectedCategory.href);

    }

    // console.log(await navigationLinks.allInnerTexts());
    // console.log(await navigationLinks.count());

});