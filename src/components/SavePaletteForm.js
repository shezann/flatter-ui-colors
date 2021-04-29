import React, { useState, useEffect } from "react";
import { Modal, Button } from "antd";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { Picker } from "emoji-mart";
import "emoji-mart/css/emoji-mart.css";

export default function SavePaletteForm(props) {
  const {
    palette,
    palettes,
    newPaletteName,
    setNewPaletteName,
    history,
    savePalette,
  } = props;

  const [modalVisible, setModalVisible] = useState(false);
  const [emojilVisible, setEmojiVisible] = useState(false);

  function addPalette(emoji) {
    let newName = newPaletteName;

    const newPalette = {
      id: newName.toLowerCase().replace(/ /g, "-"),
      paletteName: newName,
      colors: palette,
      emoji: emoji.native,
    };
    savePalette(newPalette);

    history.push(`/`);
  }

  function handlePaletteNameInput(event) {
    setNewPaletteName(event.target.value);
  }

  useEffect(() => {
    ValidatorForm.addValidationRule("isPaletteUnique", (value) =>
      palettes.every(
        ({ paletteName }) => paletteName.toLowerCase() !== value.toLowerCase()
      )
    );
  }, [palettes]);

  return (
    <div>
      <Button
        htmlType="submit"
        type="primary"
        onClick={() => setModalVisible(true)}
      >
        <span style={{ marginBottom: "10px" }}>SAVE PALETTE</span>
      </Button>
      <Modal
        title="Saving Palette"
        centered
        visible={modalVisible}
        okText="Save"
        okButtonProps={{
          form: "palette-name-form",
          key: "submit",
          htmlType: "submit",
        }}
        onCancel={() => setModalVisible(false)}
      >
        <div>
          <p>Please enter a name for your awesome palette</p>
          <ValidatorForm
            id="palette-name-form"
            instantValidate={false}
            onSubmit={() => {
              setEmojiVisible(true);
              setModalVisible(false);
            }}
          >
            <TextValidator
              value={newPaletteName}
              style={{ width: "300px" }}
              label="Palette Name"
              onChange={handlePaletteNameInput}
              validators={["required", "isPaletteUnique"]}
              errorMessages={[
                "Enter a palette name",
                "Palette name is already used",
              ]}
            />
          </ValidatorForm>
        </div>
      </Modal>

      <Modal
        centered
        width="400px"
        closable={false}
        visible={emojilVisible}
        footer={null}
        onCancel={() => setEmojiVisible(false)}
      >
        <Picker onSelect={(emoji) => addPalette(emoji)} />
      </Modal>
    </div>
  );
}
