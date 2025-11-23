import type { SidebarsConfig } from '@docusaurus/plugin-content-docs'

const sidebars: SidebarsConfig = {
  docsSidebar: [
    'intro',
    {
      type: 'category',
      label: 'For Students',
      items: ['students/browsing-courses'],
    },
    {
      type: 'category',
      label: 'For Educators',
      items: ['educators/creating-courses'],
    },
    {
      type: 'category',
      label: 'For Developers',
      items: ['developers/setup'],
    },
  ],
}

export default sidebars
