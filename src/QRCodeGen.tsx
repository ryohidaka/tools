import React from "react";
import QRCode from "qrcode.react";

import { Grid, Button } from "@material-ui/core";

export default function QRCodeGen(props: any) {
  const values = props.values;
  const url = props.url;

  function download() {
    const canvas: any = document.querySelector("canvas");
    const a = document.createElement("a");
    a.href = canvas.toDataURL("image/jpeg", 0.85);
    a.download = `qrcode_${values.subject || "noname"}` + ".jpg";
    a.click();
  }

  return (
    <Grid
      container
      item
      direction="column"
      justify="space-between"
      alignItems="center"
      xs={12}
    >
      <QRCode value={url} />
      <Button variant="contained" color="primary" onClick={download}>
        QRコードを保存する
      </Button>
    </Grid>
  );
}
