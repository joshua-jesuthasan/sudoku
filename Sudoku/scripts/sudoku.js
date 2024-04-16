window.onload = function() {
  // Get all elements in the score table with class "score" and ID "num"
  const scoreElements = document.querySelectorAll("td#num");

  // Get all cells in the board table with IDs starting with "cell"
  const boardCells = document.querySelectorAll("td[id^='cell']");

  // Add a click event listener to each score element
  scoreElements.forEach((scoreElement) => {
    scoreElement.addEventListener("click", () => {
      // Remove any existing "user-input" class from other cells
      scoreElements.forEach((element) => {
        element.classList.remove("user-input");
      });
      // Add the "user-input" class to the clicked cell
      scoreElement.classList.add("user-input");

      // Copy the text content to the clipboard
      const textarea = document.createElement("textarea");
      textarea.value = scoreElement.textContent;
      textarea.style.position = "fixed";
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      console.log("Text copied to clipboard!");
    });
  });

  // Add a click event listener to each board cell
  boardCells.forEach((boardCell) => {
    boardCell.addEventListener("click", () => {
      // Check if a score element is selected
      const selectedScoreElement = document.querySelector("td#num.user-input");
      if (selectedScoreElement) {
        // Check for repeated numbers in the same row or column
        const boardRows = document.querySelectorAll(`tr[id^='row']`);
        const boardColumns = document.querySelectorAll(`td[id$='${boardCell.id.slice(4, 5)}']`);
        let repeated = false;
        let canPaste = true;

        boardRows.forEach((boardRow) => {
          const rowCells = boardRow.querySelectorAll("td");
          rowCells.forEach((rowCell) => {
            if (rowCell.textContent === selectedScoreElement.textContent && rowCell.id !== boardCell.id) {
              repeated = true;
            }
            if (rowCell.textContent === navigator.clipboard.readText() && (rowCell.id.slice(0, 4) === boardCell.id.slice(0, 4))) {
              canPaste = false;
            }
          });
        });
        boardColumns.forEach((boardColumn) => {
          if (boardColumn.textContent === selectedScoreElement.textContent && boardColumn.id !== boardCell.id) {
            repeated = true;
          }
          if (boardColumn.textContent === navigator.clipboard.readText() && (boardColumn.id.slice(4, 5) === boardCell.id.slice(4, 5))) {
            canPaste = false;
          }
        });

        // If there are no repeated numbers, and the pasted text does not exist in the same row or column, set the text content of the board cell to the text content of the selected score element
        if (!repeated && canPaste) {
          boardCell.textContent = selectedScoreElement.textContent;
          // Remove the "user-input" class from the selected score element
          selectedScoreElement.classList.remove("user-input");
        } else {
          // Add the "error" class to the board cell if there are repeated numbers or the pasted text already exists in the same row or column
          boardCell.classList.add("error");
        }
      }
    });
  }
  
  );
};








  
