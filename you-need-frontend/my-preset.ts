import {definePreset, dt} from '@primeng/themes';
import Aura from '@primeng/themes/aura';

export const MyPreset = definePreset(Aura, {
  semantic: {
    colorScheme: {
      light: {
        primary: {
          0: '#ffffff',
          50: '{sky.50}',
          100: '{sky.100}',
          200: '{sky.200}',
          300: '{sky.300}',
          400: '{sky.400}',
          500: '{sky.500}',
          600: '{sky.600}',
          700: '{sky.700}',
          800: '{sky.800}',
          900: '{sky.900}',
          950: '{sky.950}'
        },
      },
      dark: {
        primary: {
          0: '#ffffff',
          50: '{lime.50}',
          100: '{lime.100}',
          200: '{lime.200}',
          300: '{lime.300}',
          400: '{lime.400}',
          500: '{lime.500}',
          600: '{lime.600}',
          700: '{lime.700}',
          800: '{lime.800}',
          900: '{lime.900}',
          950: '{lime.950}'
        },
        surface: {
          0: '#ffffff',
          50: '{neutral.50}',
          100: '{neutral.100}',
          200: '{neutral.200}',
          300: '{neutral.300}',
          400: '{neutral.400}',
          500: '{neutral.500}',
          600: '{neutral.600}',
          700: '{neutral.700}',
          800: '{neutral.800}',
          900: '{neutral.900}',
          950: '{neutral.950}'
        }
      }
    }
  },
  components: {
    inputtext: {
      invalid: {
        color: 'red'
      },
      color: '{primary.600}',
      border: {
        color: '{primary.300}',
      },
      focus: {
        border: {
          color: '{primary.600}',
        }
      },
      sm: {
        font: {
          size: '14px',
        }
      }
    },
    floatlabel: {
      css: () => `
        .p-floatlabel {
        color: ${dt('primary.600')};
        font-size: 14px
        }
      `
    }
  }
});


