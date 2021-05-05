import React, { useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

import { Grid, Typography, Button, Snackbar } from "@material-ui/core";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";
import Alert from "@material-ui/lab/Alert";

import Mockup from "./Mockup";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      "& > *": {
        margin: theme.spacing(1),
      },
    },
    paper: {
      width: "100%",
      height: "100%",
    },
  })
);

export default function MailTo() {
  const classes = useStyles();
  const [values, setValues] = useState({
    email: "",
    subject: "",
    body: "",
  });

  const [state, setStates] = useState({
    copied: false,
  });

  function handleInputChange(e: any) {
    const target = e.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    setValues({ ...values, [name]: value });
  }

  function handleOpen() {
    setStates({ ...state, copied: true });
  }
  function handleClose() {
    setStates({ ...state, copied: false });
  }

  let url = `mailto:${values.email}`;
  if (values.subject) {
    url += `?subject=${values.subject}`;
  }

  const body = values.body.replace(/\n/g, "%0D%0A");
  if (values.body) {
    if (!values.subject) {
      url += `?body=${body}`;
    } else {
      url += `&body=${body}`;
    }
  }

  return (
    <Grid container direction="column" className={classes.root}>
      <Typography variant="h4" component="h1" align="center">
        メールテンプレート作成
      </Typography>
      <Grid container direction="row">
        <Grid
          container
          item
          direction="column"
          justify="center"
          alignItems="center"
          xs={12}
          md={6}
        >
          <Typography variant="h5" component="h2">
            ①入力
          </Typography>
          <form noValidate autoComplete="off">
            <TextField
              id="email"
              label="送信先メールアドレス"
              type="email"
              variant="outlined"
              name="email"
              onChange={handleInputChange}
              fullWidth
              margin="normal"
            />
            <TextField
              id="subject"
              label="指定する件名"
              type="text"
              variant="outlined"
              name="subject"
              onChange={handleInputChange}
              fullWidth
              margin="normal"
            />
            <TextField
              id="body"
              label="指定する本文"
              type="text"
              variant="outlined"
              name="body"
              onChange={handleInputChange}
              multiline
              rows={6}
              fullWidth
              margin="normal"
            />
          </form>
        </Grid>

        <Grid
          container
          item
          justify="center"
          alignItems="center"
          xs={12}
          md={6}
        >
          <Mockup values={values} />
        </Grid>
      </Grid>

      {/* 2.確認 */}
      <Typography variant="h5" component="h2" align="center">
        ②確認
      </Typography>

      <Typography variant="body1" component="code">
        {url}
      </Typography>

      <Button
        variant="outlined"
        color="primary"
        href={url}
        target="_blank"
        rel="noopener noreferrer"
      >
        動作確認用リンク
      </Button>

      {/* 3.コピー */}
      <Typography variant="h5" component="h2" align="center">
        ③コピー
      </Typography>
      <CopyToClipboard text={url} onCopy={handleOpen}>
        <Button variant="contained" color="primary">
          URLをクリップボードにコピーする
        </Button>
      </CopyToClipboard>

      <Snackbar
        open={state.copied}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} variant="filled" severity="success">
          コピーされました
        </Alert>
      </Snackbar>
    </Grid>
  );
}
