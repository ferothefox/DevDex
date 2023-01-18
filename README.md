<p align="center">
    <a href="https://github.com/pupbrained/devdex">
      <img src="https://user-images.githubusercontent.com/52982404/205554195-9e88f8cf-7da4-4a3f-810a-17bfd1a087dc.png" alt="Logo">
    </a>
</p>

<h3 align="center">DevDex</h3>
<p align="center">
  A social media for developers.
  <br />
  <a href="https://devdex.me"><strong>Learn more »</strong></a>
  <br />
  <br />
  <a href="https://devdex.me/discord">Discord</a>
  ·
  <a href="https://devdex.me/twitter">Twitter</a>
  ·
  <a href="https://devdex.me/issues">Issue Tracker</a>
</p>

## Getting Started

### Prerequisites
To run DevDex on your local machine, you need these packages.

- Node.js (Version: >18)
  - Earlier versions may work, but we recommend using the latest LTS if possible. Use `nvm` to manage your Node versions.
- pnpm (recommended)

## Development

### Setup

1. **Clone the GitHub repo into a public repository**

   ```sh
   git clone https://github.com/devdexapp/devdex.git
   ```
   
2. **Create your database**
    - We recommend <a href="https://planetscale.com">PlanetScale</a> for an easy serverless database platform. Create your database and get its connection URL.

3. **Setup .env**
    - Per <a href="https://next-auth.js.org/configuration/options">NextAuth docs</a>, you must set a `NEXTAUTH_URL` and a `NEXTAUTH_SECRET`.
    - For Prisma, you must set a `DATABASE_URL` to a MySQL-compatible database connection URL. 
   
4. **Install packages** via pnpm

   ```sh
   pnpm i
   ```
   
   This step will also run Prisma, generating your schema, a client, and push new tables to your database. If this step fails, double check you have set your .env correctly.
  
5. **Quickstart**

   ```sh
   pnpm dev
   ```
   
   
 ## Deployment
 
 The easiest way to deploy DevDex is using Vercel. You will need a Pro plan due to limits of serverless functions created per deployment.
 
 [![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fdevdexapp%2Fdevdex)
 
 
 ## Roadmap
 
 We do not currently have a public roadmap available.
   
 ## Contributing
 
 We do not currently have documentation for contributors.
