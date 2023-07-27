import { Divider, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography } from "@mui/material"
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import EditIcon from '@mui/icons-material/Edit';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import ListIcon from '@mui/icons-material/List';
import { Link } from "react-router-dom";

const drawerWidth = 260;

const NavigationDrawer: React.FC<{}> = () => {
    return(
        <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="permanent"
        anchor="left"
      >{
          <>
          <Toolbar />
              <List>
                <Link to="/">
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemIcon>
                      <ListIcon />
                    </ListItemIcon>
                    <ListItemText primary="Employee List" />
                  </ListItemButton>
                </ListItem>
                </Link>
                <Divider />
                <Toolbar>
                  <Typography variant="h6" noWrap component="div">
                  React-hook-form
                  </Typography>
                </Toolbar>
                <Link to="/add-employee-react-hook">
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemIcon>
                      <PersonAddIcon />
                    </ListItemIcon>
                    <ListItemText primary="Add Employee" />
                  </ListItemButton>
                </ListItem>
                </Link>
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemIcon>
                      <EditIcon />
                    </ListItemIcon>
                    <ListItemText primary="Edit Employee" />
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemIcon>
                      <PersonRemoveIcon />
                    </ListItemIcon>
                    <ListItemText primary="Delete Employee" />
                  </ListItemButton>
                </ListItem>
                <Divider />
                <Toolbar>
                  <Typography variant="h6" noWrap component="div">
                    Formik
                  </Typography>
                </Toolbar>
                <Link to="/add-employee-formik">
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemIcon>
                      <PersonAddIcon />
                    </ListItemIcon>
                    <ListItemText primary="Add Employee" />
                  </ListItemButton>
                </ListItem>
                </Link>
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemIcon>
                      <EditIcon />
                    </ListItemIcon>
                    <ListItemText primary="Edit Employee" />
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemIcon>
                      <PersonRemoveIcon />
                    </ListItemIcon>
                    <ListItemText primary="Delete Employee" />
                  </ListItemButton>
                </ListItem>
                <Divider />
              </List>

          </>                
      }
      </Drawer> 
    );
}

export default NavigationDrawer;

