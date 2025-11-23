# SpecWerk Landing Page

Marketing site and Studio demo for SpecWerk - a spec-first AI automation platform.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
- `DEEPSEEK_API_KEY`: Required for Studio demo to function. Set this in your Vercel project settings or create a `.env.local` file:
```
DEEPSEEK_API_KEY=your_key_here
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

- `/app` - Next.js App Router pages and API routes
  - `/app/page.tsx` - Main landing page
  - `/app/studio` - Studio demo pages
  - `/app/api/studio` - API routes for workflow execution
  - `/app/components` - Reusable components (Logo)
- `/lib` - Shared libraries
  - `deepseek.ts` - DeepSeek API client
  - `demoWorkflow.ts` - Demo workflow runtime
  - `specRunner.ts` - Spec execution engine
- `/public` - Static assets
  - `/public/specs` - Example spec files
  - `/public/icon.svg` - SpecWerk icon (favicon)
  - `/public/logo.svg` - Full logo with wordmark
- `/docs` - Documentation
  - `/docs/brand.md` - Brand guide and design system

## Spec Format (Demo Version 0.1)

The demo supports a restricted spec format for safety:

- **Version**: Must be "0.1"
- **Input fields**: Define form inputs (text, date, number)
- **Steps**: Two types allowed:
  - `tool`: Calls allowlisted demo functions (demo.fetch_invoices, demo.fetch_payments, demo.match_invoices)
  - `agent`: Calls DeepSeek with a templated prompt
- **Templating**:
  - `$inputs.fieldName` in params
  - `{{ steps.stepId }}` and `{{ inputs.fieldName }}` in prompts

See `/public/specs/invoice-recon-demo.yaml` for a complete example.

## Deployment

This project is configured for Vercel deployment.

### Vercel Setup

1. Connect your GitHub repository (`funwae/specwerk-web`) to Vercel
2. Set the environment variable in Vercel project settings:
   - `DEEPSEEK_API_KEY`: Your DeepSeek API key (required for Studio demo)
3. Deploy - Vercel will automatically detect Next.js and configure the build

The site will be available at your Vercel domain (e.g., `specwerk-web.vercel.app`).

### Environment Variables

- `DEEPSEEK_API_KEY` (required): DeepSeek API key for AI agent functionality in the Studio demo

## License

ISC

