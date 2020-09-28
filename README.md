# DAT257-K9
Project for course DAT257

# Rules
- Never work on the master branch, always work on a feature branch
- When you want to push something, push it to your feature branch, then do a pull request
- Always use linter (e.g. eslint) before you do a pull request
- Always write tests for your code, use test driven development (TDD)
- Create meaningful commits and write informational commit messages

# Linting frontend
In [your working directory]/frontend
```
npm run lint
```
Fix all errors/warnings before creating a pull request.

# Styling frontend
- Try to the best of your ability to follow established design mockups.
- Follow [CSS best practices](https://gist.github.com/basham/2175a16ab7c60ce8e001); choose the right units!
- Consistent styling is achieved by styled-component's ThemeProvider. Your styles should depend on these properties! See theme definitions in 'frontend/src/themes'.
- Apply color according to the agreed color scheme.
- Refer to colors by those defined in 'frontend/src/themes', for example:
```
const Label = styled.label`
    font-family: Kufam, sans-serif;
    font-weight: 400;
    font-size: 0.8em;
    color: ${(props) => props.theme.colors.inactive};
`;
```
- Apply spacing and padding according to the theme, exceptions are acceptable though, for example:
```
const CardHeader = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;

    display: flex;
    align-items: flex-end;
    justify-content: space-between;

    box-sizing: content-box;
    padding: ${(props) => props.theme.padding.section};
`;
```

# Individual reflections
https://studentchalmersse.sharepoint.com/sites/K9-Agilekurs/Shared%20Documents/Forms/AllItems.aspx?RootFolder=%2Fsites%2FK9%2DAgilekurs%2FShared%20Documents%2FGeneral%2Findividuella%20reflektioner&FolderCTID=0x012000A7E3CD2C1D8C6A408337BA5441387C34

# Team reflections
https://studentchalmersse.sharepoint.com/:w:/r/sites/K9-Agilekurs/_layouts/15/Doc.aspx?sourcedoc=%7B6DFB7CCA-472C-4D2F-AB9F-62098AAC364D%7D&file=Team%20reflections.docx&action=edit&mobileredirect=true

# Social contract
https://studentchalmersse.sharepoint.com/:w:/r/sites/K9-Agilekurs/_layouts/15/Doc.aspx?sourcedoc=%7B98F4E432-84CF-4B6D-985B-27A6FE108DC3%7D&file=Social%20contract.docx&action=edit&mobileredirect=true

# Scrum board
https://app.clubhouse.io/eda257k9
