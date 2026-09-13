(function () {
  if (typeof navigator === 'undefined' || !navigator.modelContext) return;
  navigator.modelContext.provideContext({
    tools: [
      {
        name: "search_products",
        description: "Search Cosy Cats Cattery available kittens, castles, and nutrition by keyword or price",
        inputSchema: {
          type: "object",
          properties: {
            query: { type: "string" },
            category: { type: "string" },
            max_price: { type: "number" }
          }
        },
        execute: async ({ query, category, max_price }) => {
          const params = new URLSearchParams();
          if (query) params.set('q', query);
          if (category) params.set('category', category);
          if (max_price) params.set('max_price', max_price);
          const res = await fetch(`https://cosycatscattery.com.au/api/search?${params}`);
          return res.json();
        }
      },
      {
        name: "browse_products",
        description: "Browse kittens and products by collection",
        inputSchema: {
          type: "object",
          properties: { category: { type: "string" } }
        },
        execute: async ({ category }) => {
          const url = `https://cosycatscattery.com.au/shop/`;
          window.location.href = url;
          return { url };
        }
      },
      {
        name: "contact",
        description: "Contact Cosy Cats Cattery concierge for kitten adoption questions",
        inputSchema: { type: "object", properties: {} },
        execute: async () => {
          window.location.href = `https://cosycatscattery.com.au/contact/`;
          return { url: `https://cosycatscattery.com.au/contact/` };
        }
      }
    ]
  });
})();
