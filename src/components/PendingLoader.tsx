import { Box, LoadingOverlay } from '@mantine/core';

const PendingLoader = () => {
  return (
    <Box>
      <LoadingOverlay
        visible
        zIndex={1000}
        overlayProps={{ radius: 'sm', blur: 2 }}
        loaderProps={{ type: 'dots', size: 50 }}
      />
    </Box>
  );
};

export default PendingLoader;
