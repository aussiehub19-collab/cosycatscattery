# Auth.md

## Site: Cosy Cats Cattery — Luxury Maine Coon Cattery & Boutique

## Agent Registration
No authentication required. All resources are publicly accessible.

## Public Resources
| Resource | URL |
|---|---|
| Product & Kitten Catalog | https://cosycatscattery.com.au/shop/ |
| Knowledge Blog | https://cosycatscattery.com.au/blog/ |
| FAQ & Health Guides | https://cosycatscattery.com.au/faq/ |
| About & Pedigree Standards | https://cosycatscattery.com.au/about/ |

## Authentication

```json
{
  "agent_auth": {
    "register_uri": null,
    "identity_types_supported": ["none"],
    "credential_types_supported": ["none"],
    "notes": "No authentication required. All resources are public."
  }
}
```

## Ordering
Human-in-the-loop required. Agents may browse catalog items and prepare order/enquiry drafts.
Final kitten adoptions and payments are completed by human verification via direct bank transfer or PayID.
