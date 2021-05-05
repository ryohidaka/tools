import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

import { Grid, Typography, Paper } from "@material-ui/core";

import "html5-device-mockups/dist/device-mockups.min.css";

import { IPhone7 } from "react-device-mockups";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      width: "100%",
      height: "100%",
      "& > *": {
        margin: theme.spacing(1),
      },
    },
    cancel: {
      color: "blue",
    },
    title: {},
  })
);

export default function Mockup(props: any) {
  const classes = useStyles();
  const values = props.values;

  return (
    <IPhone7 height={500} orientation="portrait" color="black">
      <Grid
        direction="column"
        component={Paper}
        className={classes.paper}
        square
        container
      >
        <Grid container item justify="flex-start">
          <Typography variant="body2" component="p" className={classes.cancel}>
            キャンセル
          </Typography>
        </Grid>
        <Grid container item justify="flex-start">
          <Typography variant="h6" component="p" className={classes.title}>
            新規メッセージ
          </Typography>
        </Grid>
        <Grid container item justify="flex-start">
          <Typography variant="body2" component="p">
            宛先:
          </Typography>
          <Typography variant="body2" component="p">
            {values.email}
          </Typography>
        </Grid>
        <Grid container item justify="flex-start">
          <Typography variant="body2" component="p">
            件名:
          </Typography>
          <Typography variant="body2" component="p">
            {values.subject}
          </Typography>
        </Grid>
        <Grid container item justify="flex-start" direction="column">
          {values.body.split("\n").map((str: string, index: number) => (
            <Typography variant="body2" component="p" key={index} align="left">
              {str}
              <br />
            </Typography>
          ))}
        </Grid>
      </Grid>
    </IPhone7>
  );
}
