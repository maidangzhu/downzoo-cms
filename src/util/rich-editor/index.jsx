import React from "react";
import Simditor from "simditor";
import "simditor/styles/simditor.scss";
import "./index.scss";

// 通用的富文本编辑器，依赖jQuery
class RichEditor extends React.Component {
  constructor(props) {
    super(props);

    this.loadEditor = this.loadEditor.bind(this);
    this.bindEditorEvent = this.bindEditorEvent.bind(this);
  }

  componentDidMount() {
    this.loadEditor();
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.initialDetail !== nextProps.initialDetail) {
      this.simditor.setValue(nextProps.initialDetail);
    }
  }

  // 加载富文本编辑器
  loadEditor() {
    const elem = this.refs["textarea"];
    this.simditor = new Simditor({
      textarea: $(elem),
      defaultValue: this.props.placeholder || "请输入内容",
      upload: {
        url: "/manage/product/richtext_img_upload.do",
        defaultImage: "",
        fileKey: "upload_file",
      },
    });
    this.bindEditorEvent();
  }

  bindEditorEvent() {
    this.simditor.on("valuechanged", (e) => {
      this.props.onValueChange(this.simditor.getValue());
    });
  }

  render() {
    return (
      <div className="rich-editor">
        <textarea ref="textarea" />
      </div>
    );
  }
}

export default RichEditor;
