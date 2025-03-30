import { Card, Stack, Group, Title, Text, Grid } from '@mantine/core';
import { IconMapPin, IconPhone, IconMail, IconWorld } from '@tabler/icons-react';
import { useStyles } from '../CompanyManagement.styles';

export const CompanyContactInfo = ({ company }) => {
  const { classes } = useStyles();

  return (
    <Card p="md" radius="md" withBorder className={`${classes.card} ${classes.contactCard}`}>
      <Stack spacing="md">
        <Group>
          <div className={classes.iconWrapper}>
            <IconMapPin size={20} color="white" />
          </div>
          <Title order={3} className={classes.title}>Dane kontaktowe</Title>
        </Group>
        
        <Grid>
          <Grid.Col span={6}>
            <Stack spacing="xs">
              <Group>
                <IconMapPin size={16} className={classes.label} />
                <Text size="sm" className={classes.label}>Adres</Text>
              </Group>
              <Text className={classes.value}>
                {company?.address}<br />
                {company?.postalCode} {company?.city}
              </Text>
            </Stack>
          </Grid.Col>
          <Grid.Col span={6}>
            <Stack spacing="xs">
              <Group>
                <IconPhone size={16} className={classes.label} />
                <Text size="sm" className={classes.label}>Telefon</Text>
              </Group>
              <Text className={classes.value}>{company?.phoneNumber}</Text>
            </Stack>
          </Grid.Col>
          <Grid.Col span={6}>
            <Stack spacing="xs">
              <Group>
                <IconMail size={16} className={classes.label} />
                <Text size="sm" className={classes.label}>Email</Text>
              </Group>
              <Text className={classes.value}>{company?.email}</Text>
            </Stack>
          </Grid.Col>
          <Grid.Col span={6}>
            <Stack spacing="xs">
              <Group>
                <IconWorld size={16} className={classes.label} />
                <Text size="sm" className={classes.label}>Strona internetowa</Text>
              </Group>
              <Text className={classes.value}>{company?.website}</Text>
            </Stack>
          </Grid.Col>
        </Grid>
      </Stack>
    </Card>
  );
};