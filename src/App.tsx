import { useState, ChangeEvent } from "react";
import { TextField, IconButton, styled } from "@mui/material";
import { ArrowForwardIos } from "@mui/icons-material";
import _ from "lodash";

function App() {
  const [targetText, setTargetText] = useState<string>("");
  const [trimmedText, setTrimmedText] = useState<string>("");

  const handleTextFieldChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTargetText(e.target.value);
  };

  const handleIconButtonClick = () => {
    const textList = targetText.split("\n");
    let newList: string[] = [];
    textList.forEach((text) => {
      newList.push(Array.from(new Set(text.split(" "))).join(" "));
    });

    const resultList: string[] = [];
    newList.forEach((text) => {
      const targetList = text.split(" ");
      targetList.forEach((text2, i) => {
        for (let len = 2; len < text2.length; len++) {
          for (let startIdx = 0; startIdx < text2.length; startIdx++) {
            const targetWord = text2.substring(startIdx, startIdx + len);
            targetList.forEach((compareText, j) => {
              if (i === j) return;
              targetList[j] = compareText.replaceAll(targetWord, "");
            });
          }
        }
      });
      resultList.push(_.pullAll(targetList, [""]).join(" "));
    });
    setTrimmedText(resultList.join("\n"));
  };

  return (
    <Wrap>
      <Title>중복 단어 제거</Title>
      <FieldWrap>
        <CustomTextField
          multiline
          autoFocus
          value={targetText}
          onChange={handleTextFieldChange}
        />
        <CustomIconButton onClick={handleIconButtonClick}>
          <ArrowForwardIos />
        </CustomIconButton>
        <CustomTextField
          multiline
          value={trimmedText}
          InputProps={{ readOnly: true }}
        />
      </FieldWrap>
    </Wrap>
  );
}

export default App;

const Wrap = styled("div")({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  margin: "1.5rem 0",
  width: "100vw",
  minWidth: "100rem",
  minHeight: "calc(98vh - 3rem)",
  gap: "2rem",
});

const Title = styled("span")({
  fontSize: "2rem",
  fontWeight: 600,
});

const FieldWrap = styled("div")({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
  height: "100%",
  gap: "2rem",
});

const CustomTextField = styled(TextField)({
  width: "45rem",
});

const CustomIconButton = styled(IconButton)({
  width: "2rem",
  height: "2rem",
});
