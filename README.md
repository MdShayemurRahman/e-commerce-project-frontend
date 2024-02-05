# Frontend Project (E-Commerce WebApp)

![React](https://img.shields.io/badge/React-v.18-blue)
![Redux toolkit](https://img.shields.io/badge/RTK-v.1-purple)
![TypeScript](https://img.shields.io/badge/TypeScript-v.4-green)
![Material UI](https://img.shields.io/badge/Material_UI-v.5-2196f3)

## Introduction

The purpose of this repository is to demonstrate a solution that serves as an e-commerce store from the [Platzi Fake Store API](https://fakeapi.platzi.com/) - using React, Redux Toolkit, TypeScript, and Material UI.

## Table of contents

- [Requirements](#requirement)
- [Technologies](#technologies)
- [Get Started](#get-started)
- [Deployment](#deployment)
- [Project structure](#project-structure)

## Requirements

1. Use the API endpoint [https://fakeapi.platzi.com/](https://fakeapi.platzi.com/) to create an e-commerce website. Read the documentation and learn how to use the different endpoints.
2. Create at lease 4 pages (can be more if you want): Page for all products, product page,
   profile page (only available if user logins), and cart page (cart page could be a page or a modal)
3. Create Redux store for following features:
   - product reducer: get all products, find a single products, filter products by
     categories, sort products by price. Create, update and delete a product (enable update & delete features only for admin of the webapp)
   - user reducer: register and login
   - cart reducer: add product to cart, remove products, update products's quantity in cart
4. When adding routers to your application, programmatically set certain routes to be private. For example, route to user profile page should not be accessible if user has not logged in.
5. Implement unit testing for the reducers (-)
6. Deploy the application and rewrite README file.

### Bonus

1. Use pagination when fetching/displaying all the products (✔️).

## Technologies

- React
- TypeScript
- Material UI
- Redux Toolkit

## Get Started

1. git clone [Link Text](https://github.com/mdshayemurrahman/fs16_6-frontend-project) E-CommerceApp
2. npm install
3. npm start

## Deployment

Demo -> [Link Text](https://main--superlative-flan-26528c.netlify.app/)

## Project structure

```
src
├── index.css
├── components
│   ├── CardItem.tsx
│   ├── CartProduct.tsx
│   ├── FilterItem.tsx
│   ├── Footer.tsx
│   ├── Layout.tsx
│   ├── Pagination.tsx
│   ├── ProductFilter.tsx
│   ├── ProductList.tsx
│   ├── ProtectedRoute.tsx
│   ├── SortByCategory.tsx
│   ├── SortByPriceOrder.tsx
├── hooks
│   ├── useAppDispatch.ts
│   └── useAppSelecter.ts
├── index.tsx
├── pages
│   ├── CartPage.tsx
│   ├── CreateProductPage.tsx
│   ├── LoginPage.tsx
│   ├── PageNotFound.tsx
│   ├── ProductPage.tsx
│   ├── ProfilePage.tsx
│   ├── RegisterPage.tsx
│   ├── UpdateProduct.tsx
│   └── HomePage.tsx
├── services
│   ├── reducers
│   │   ├── cartReducer.ts
│   │   ├── categoryReducer.ts
│   │   ├── productReducer.ts
│   │   └── userReducer.ts
│   └── store.ts
├── setupTests.ts
├── models
    ├── CartItemProps.ts
    ├── CategoryProps.ts
    ├── PaginationProps.ts
    ├── ProductProps.ts
    ├── UserCredentialProps.ts
    └── UserProps.ts

```
