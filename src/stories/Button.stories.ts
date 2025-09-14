import { Starfield } from '../Starfield.component'

import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Starfield',
  component: Starfield,
  tags: ['autodocs']
} satisfies Meta<typeof Starfield>

export default meta
type Story = StoryObj<typeof meta>


export const Default: Story = {
  args: {}
}

export const Fullscreen: Story = {
  parameters: {
    layout: 'fullscreen'
  },
  args: {}
}
