import { Card, Stack, Group, Title, Text, Badge, Grid } from '@mantine/core';
import { IconBuilding } from '@tabler/icons-react';
import { useStyles } from '../CompanyManagement.styles';

export const CompanyBasicInfo = ({ company }) => {
  const { classes } = useStyles();

  return (
    <Card p="md" radius="md" withBorder className={`${classes.card} ${classes.infoCard}`}>
      <Stack spacing="md">
        <Group position="apart">
          <Group>
            <div className={classes.iconWrapper}>
              <IconBuilding size={20} color="white" />
            </div>
            <Title order={3} className={classes.title}>Podstawowe informacje</Title>
          </Group>
          <Badge 
            color={company?.isActive ? "green" : "red"}
            variant="gradient"
            gradient={{ from: company?.isActive ? 'teal' : 'red', to: company?.isActive ? 'lime' : 'pink' }}
          >
            {company?.isActive ? "Aktywna" : "Nieaktywna"}
          </Badge>
        </Group>
        
        <Grid>
          <Grid.Col span={6}>
            <Stack spacing="xs">
              <Text size="sm" className={classes.label}>Nazwa firmy</Text>
              <Text className={classes.value}>{company?.name}</Text>
            </Stack>
          </Grid.Col>
          <Grid.Col span={6}>
            <Stack spacing="xs">
              <Text size="sm" className={classes.label}>NIP</Text>
              <Text className={classes.value}>{company?.nip}</Text>
            </Stack>
          </Grid.Col>
          <Grid.Col span={6}>
            <Stack spacing="xs">
              <Text size="sm" className={classes.label}>REGON</Text>
              <Text className={classes.value}>{company?.regon}</Text>
            </Stack>
          </Grid.Col>
          <Grid.Col span={6}>
            <Stack spacing="xs">
              <Text size="sm" className={classes.label}>Opis</Text>
              <Text className={classes.value}>{company?.description}</Text>
            </Stack>
          </Grid.Col>
        </Grid>
      </Stack>
    </Card>
  );
}; 