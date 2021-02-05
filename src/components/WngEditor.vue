<template>
	<div>
		<div ref="editor"
		></div>
	</div>
</template>

<script>
	// import E from 'wangeditor'

	export default {
		name: "WngEditor",
		data(){
			return{
				editor:null
			}
		},
		model: {
			prop: "editorContent",
			event: "change"
		},
		props: {
			editorContent: { required: true },
			sonContent: String
		},
		mounted() {
			/*实例化*/

			const editor = new E(this.$refs.editor)
			editor.customConfig.menus = [          //菜单配置
				'head',  // 标题
				'bold',  // 粗体
				'fontSize',  // 字号
				'fontName',  // 字体
				'italic',  // 斜体
				'underline',  // 下划线
				'strikeThrough',  // 删除线
				'foreColor',  // 文字颜色
				'backColor',  // 背景颜色
				'link',  // 插入链接
				'list',  // 列表
				'justify',  // 对齐方式
				'quote',  // 引用
				'table',  // 表格
				'undo',  // 撤销
				'redo'  // 重复
			]
			/*绑定回馈事件*/
			editor.customConfig.onchange = html => {
				this.$emit("change", html);
			};
			/*创建编辑器*/
			editor.create();
			/*初始内容*/
			editor.txt.html(this.editorContent);
			this.editor = editor
			if(this.sonContent){
				this.editor.cmd.do('insertHTML', this.sonContent)
			}
		},
		methods:{
			addText(info){
				if(info){
					this.editor.txt.clear()
					this.editor.txt.html(info)
				}else if(info == 'null') this.editor.txt.html('')
			},
			clearTexr(){
				console.info('cmd,',this.editor.cmd)
				this.editor.txt.clear()
			}
		}
	}
</script>

<style lang="scss" scoped>
</style>
