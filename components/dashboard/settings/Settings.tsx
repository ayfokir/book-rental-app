import React, { useState } from 'react';
import { NextPage } from 'next';
import { Box, Typography, Button, Switch, FormControlLabel } from  "@mui/material"

interface PermissionItem {
  role: 'Admin' | 'Renter' | 'Owner';
  permission: string;
  granted: boolean;
}

const Settings: NextPage = () => {
  const [permissions, setPermissions] = useState<PermissionItem[]>([
    { role: 'Admin', permission: 'View Dashboard', granted: true },
    { role: 'Admin', permission: 'Manage Users', granted: true },
    { role: 'Admin', permission: 'Modify Settings', granted: true },
    { role: 'Renter', permission: 'View Listings', granted: true },
    { role: 'Renter', permission: 'Apply for Rentals', granted: true },
    { role: 'Renter', permission: 'Pay Rent', granted: true },
    { role: 'Owner', permission: 'List Property', granted: true },
    { role: 'Owner', permission: 'Approve Tenants', granted: true },
    { role: 'Owner', permission: 'Collect Rent', granted: true },
  ]);

  const handlePermissionToggle = (index: number) => {
    const updatedPermissions = [...permissions];
    updatedPermissions[index].granted = !updatedPermissions[index].granted;
    setPermissions(updatedPermissions);
  };

  return (
    <Box p={4}>
      <Typography variant="h4" gutterBottom>
        Permissions Management
      </Typography>
      {['Admin', 'Renter', 'Owner'].map((role) => (
        <Box key={role} mt={4}>
          <Typography variant="h5" gutterBottom>
            {role}
          </Typography>
          {permissions.filter((item) => item.role === role).map((item, index) => (
            <FormControlLabel
              key={index}
              control={
                <Switch
                  checked={item.granted}
                  onChange={() => handlePermissionToggle(permissions.indexOf(item))}
                />
              }
              label={item.permission}
            />
          ))}
        </Box>
      ))}
      <Box mt={4} display="flex" justifyContent="flex-end">
        <Button variant="contained" color="primary">
          Save Changes
        </Button>
      </Box>
    </Box>
  );
};

export default Settings;