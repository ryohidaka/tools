import React, { useState, useEffect } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

import { Grid, Typography, Button, Snackbar } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";

import Mockup from "./Mockup";
import QRCodeGen from "./QRCodeGen";

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

type Values = {
  email: string;
  subject: string;
  body: string;
};

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
    componentDidUpdate(values);
  }
  function handleClose() {
    setStates({ ...state, copied: false });
  }

  //[永続化] LocalStorageに格納
  function componentDidUpdate(values: Values) {
    localStorage.setItem("values", JSON.stringify(values));
    console.log("下書きが保存されました");
  }

  //[永続化] LocalStorageに格納
  useEffect(() => {
    componentDidLoad(values);
  }, []);

  function componentDidLoad(values: Values) {
    const payload = JSON.parse(localStorage.getItem("values") as any);
    if (payload) {
      console.log("下書きを読み込みました");
      setValues({
        ...values,
        email: payload.email,
        subject: payload.subject,
        body: payload.body,
      });
    }
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
              value={values.email}
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
              value={values.subject}
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
              defaultValue={values.body}
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

      <Grid container direction="row">
        {/* 3.コピー */}
        <Grid
          container
          item
          direction="column"
          justify="space-between"
          alignItems="center"
          xs={12}
          md={6}
        >
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

        {/* 4.QRコード */}
        <Grid
          container
          item
          direction="column"
          justify="space-between"
          alignItems="center"
          xs={12}
          md={6}
        >
          <Typography variant="h5" component="h2" align="center">
            ④QRコード
          </Typography>
          <QRCodeGen values={values} url={url} />
        </Grid>
      </Grid>
    </Grid>
  );
}
