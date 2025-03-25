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
        mypreset: {
          0: '{primary.600}',
          1: '{primary.300}',
        }
      },
      dark: {
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
        },
        mypreset: {
          0: '#ffffff',
          1: '#ffffff'
        }
      }
    }
  },
  components: {
    menubar: {
      border: {
        color: 'transparent',
        radius: 0
      }
    },
    inputtext: {
      invalid: {
        color: 'red'
      },
      color: '{mypreset.0}',
      border: {
        color: '{mypreset.1}',
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
        color: ${dt('mypreset.0')};
        font-size: 14px;
        opacity: 0.9
        }
      `
    }
  }
});


