# BioChef

A meal planning app that takes your current bodies nutritional needs and allows you to hit the required daily macros. Provides a shopping list of all of the meals you've planned to help.

## Tech Stack



|Type|Version|Description |
|--|--|--|
|Framework| NextJs | Full stack framework based on **React**, that allows our front-end and back-end code all in one place.
|Database| Postgresql |Hosted on Supabase. With a **Prisma** ORM to easily perform CRUD operations.|
|Styling|DaisyUI|Component library, with **TailwindCSS** to fine tune.|
|Testing| CypressJS | Feature rich testing library, provides full e2e integration tests|
|Backend| tRPC | Used to utilise the Remote Procedure Call pattern, providing full type Safety throughout the application.|
|Auth| Clerk| Simplistic, feature rich auth provider|
 

## Setup

 1. Create a `.env` file in the root folder.
 2. `DATABASE_URL={Your Database URL }`  - get one from [Supabase](supabase.io)
 3. `SPOONACULAR_API_KEY={Your Spoonacular API Key` - get one from [Spoonacular API site](https://spoonacular.com/food-api/)
 4. Get your Clerk login details from [Clerk](https://clerk.com/)
	1. `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY={Your Clerk Publishable Key}`
	2. `CLERK_SECRET_KEY={Your Clerk Secret Key}`
5. Get an AppliTools Key from [AppliTools](https://applitools.com/docs/topics/overview/obtain-api-key.html)
	1. Run this in your terminal `export APPLITOOLS_API_KEY={Your Applitools Key}`
6. Run `npm install`
7. Run `npx prisma generate && npx prisma db push` to set up your database.
8. Finally, run `npm run dev`

## TODO

 - [ ] Fix Middleware issues with images not appearing
 - [ ] Add loading states
 - [ ] Move more layout logic to RootLayout
 - [ ] Add CRUD options to Meal Cards
 - [ ] Improve Mobile layout throughout
 - [ ] Improve test coverage
 - [ ] Make empty MealCards pretty
 - [ ] Add Subscribe page
 - [ ] Stub getting new recipes for unit testing purposes.

