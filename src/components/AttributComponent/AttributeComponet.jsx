import React from 'react';
import { Grid, Stack, Button, Typography } from '@mui/material';

function AttributeComponent({
  attributeName,
  attributeId,
  attributeValues = [],
  productAttribute = [],  // Product attributes passed from the parent
  selectedBtnFn,  // Function to handle button clicks
}) {

  return (
    <Grid container alignItems="center" spacing={2}>
      <Grid item>
        <Typography variant="subtitle1">{attributeName}</Typography>
      </Grid>

      <Grid item>
        <Stack direction="row" spacing={1}>
          {attributeValues.map((attrVal) => {

            // Check if the current button value is already selected based on the productAttributes
            const isSelected = productAttribute.some(
              (prodAttr) => prodAttr.attributeName === attributeName && prodAttr.value === attrVal
            );

            // Check if the button should be disabled based on product attributes
            const isDisabled = productAttribute.some(
              (prodAttr) => prodAttr.attributeName === attributeName && prodAttr.value === attrVal
            );

            return (
              <Button
                key={attrVal}
                variant="outlined"
                onClick={() => selectedBtnFn(attributeId, attrVal)}
                disabled={isDisabled}
                sx={{
                  backgroundColor: isSelected ? 'primary.main' : 'transparent',
                  color: isSelected ? 'white' : 'initial',
                  '&:hover': {
                    backgroundColor: isSelected ? 'primary.dark' : 'transparent',
                  },
                }}
              >
                {attrVal}
              </Button>
            );
          })}
        </Stack>
      </Grid>
    </Grid>
  );
}

export default AttributeComponent;
