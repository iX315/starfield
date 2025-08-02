import type { StoryObj } from '@storybook/react-vite';
declare const meta: {
    title: string;
    component: ({ options, ...restProps }: import("../Starfield.component").StarfieldProps) => import("react/jsx-runtime").JSX.Element;
    tags: string[];
};
export default meta;
type Story = StoryObj<typeof meta>;
export declare const Default: Story;
export declare const Fullscreen: Story;
