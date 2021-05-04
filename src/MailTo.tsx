import React, { useState, useEffect } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

import { Grid, Typography, Button } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      "& > *": {
        margin: theme.spacing(1),
      },
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
  function handleInputChange(e: any) {
    const target = e.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    setValues({ ...values, [name]: value });
    componentDidUpdate(values);
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
    <Grid container direction="column" justify="center" alignItems="center">
      <form className={classes.root} noValidate autoComplete="off">
        <TextField
          id="email"
          label="送信先メールアドレス"
          type="email"
          InputLabelProps={{
            shrink: true,
          }}
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
          InputLabelProps={{
            shrink: true,
          }}
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
          rowsMax={10}
          fullWidth
          margin="normal"
        />
      </form>
      <Typography variant="h5" component="p">
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

      <CopyToClipboard text={url}>
        <Button variant="contained" color="primary">
          URLをクリップボードにコピーする
        </Button>
      </CopyToClipboard>
    </Grid>
  );
}
