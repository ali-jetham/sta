export default function Editor(props) {
  return (
    <div>
      <h1>Editor</h1>
      <textarea name="editor" id="editor" value={props.fileContent}></textarea>
    </div>
  )
}
