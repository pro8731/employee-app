import { AppBar, Toolbar, Typography } from "@mui/material";

const ApplicationHeader: React.FC<{}> = () => {
    return(
        <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
        >
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            Employee Managment
          </Typography>
        </Toolbar>
      </AppBar>
    );
}

export default ApplicationHeader;
    