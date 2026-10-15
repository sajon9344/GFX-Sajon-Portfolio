export type Project = {
  id: string;
  title: string;
  category: string;
  year: string;
  description: string;
  image_url: string;
  accent: string;
  featured?: boolean;
};

export const sampleProjects: Project[] = [
  { id: 'solis', title: 'Solis Royal', category: 'Brand Identity', year: '2026', description: 'A considered identity for a Mediterranean hospitality destination.', image_url: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1400&q=85', accent: '#d8c5a7', featured: true },
  { id: 'elora', title: 'Elora Organics', category: 'Packaging Design', year: '2026', description: 'Earth-led packaging built around clarity, texture and calm.', image_url: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=1400&q=85', accent: '#a5b59a', featured: true },
  { id: 'afterhours', title: 'Afterhours', category: 'Campaign Design', year: '2025', description: 'A high-energy visual system for nights that move differently.', image_url: 'https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&w=1400&q=85', accent: '#a58bff' },
  { id: 'form', title: 'FORM Objects', category: 'Art Direction', year: '2025', description: 'A sculptural campaign exploring everyday objects and form.', image_url: 'https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?auto=format&fit=crop&w=1400&q=85', accent: '#c8c5bf' },
  { id: 'valos', title: 'Valos Motion', category: 'Brand Identity', year: '2025', description: 'A confident, kinetic identity for a new mobility generation.', image_url: 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&w=1400&q=85', accent: '#d4ff59' },
  { id: 'mono', title: 'Mono Studio', category: 'Digital Design', year: '2024', description: 'A digital-first identity with a strong typographic point of view.', image_url: 'https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=1400&q=85', accent: '#b7a1ff' }
];
