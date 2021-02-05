<!--法律法规-->
<template>
	<div class="template-wrapper">
		<div class="tw-my-layout" style="">
			<div class="tw-my-layout-left">
				<div class="dataListPanel center">
					<div class="header">
						<el-button type="primary" size="small" @click="showDialog('添加')">+</el-button>
					</div>
					<div class="content">
						<div class="scrollbar-macosx">
							<div class="base-item text-clear" v-for="item in emergencyPlanList" @click="showContent(item)">
								<div class="item-title" v-text="item.NAME" ></div>
								<div class="item-tool">
									<el-button type="primary" size="small" @click="showBack(item)">编辑</el-button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="tw-my-layout-main">
				<div class="dataListPanel center" style="padding: 0;">
					<div class="header" v-text="showInfo.title">
					</div>
					<div class="content">
						<div class="scrollbar-macosx">
							<div id="content" style="height: 100%;overflow-y: auto;" v-html="showInfo.content"></div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<el-dialog :title="dialog.title" :visible.sync="dialogVisible" width="600px" :close-on-click-modal="false" :before-close="handleClose">
			<el-form class="hz-form">
				<el-form-item label="预案标题">
					<el-input v-model="dialog.form.title" placeholder="预案标题"></el-input>
				</el-form-item>
				<el-form-item label="预案内容">
					<wangeditor v-model="editor" class="tw-editor" ref="wangEditor" :sonContent="sonContent"></wangeditor>
					<!--					<div id="editor"></div>-->
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button @click="dialogVisible = false">取 消</el-button>
				<el-button type="primary" @click="submitInfo">确 定</el-button>
			</span>
		</el-dialog>
	</div>
</template>

<script>
	import axios from 'axios';
	import wangeditor from '../../../components/WngEditor'

	export default {
		name: "flfg",
		data(){
			return{
				emergencyPlanList:[],
				dialogVisible:false,
				sonContent: '',
				dialog:{
					title:'',
					form:{
						title:'',
						nowId:0
					}
				},
				editorType:false,
				editor:null,
				showInfo:{
					title:'暂无内容',
					content:''
				}
			}
		},
		components: {
			'wangeditor':wangeditor,
		},
		mounted(){
			this.$nextTick(() =>{
				// this.editor.tag = new wangEditor('#editor');
				// this.editor.tag.customConfig.menus = this.editor.option;
				// this.editor.tag.create();
				this.getAllNames();
			});
		},
		methods:{
			showContent(data){
				this.showInfo.title = data.NAME;
				this.getContent(data.ID);
			},
			getAllNames(){
				const baseURL = this.baseURL;
				axios.get('Yjzh/getAllNames',{
					baseURL:baseURL,
					params:{
						table:'TB_YJZH_FLFG'
					}
				}).then(res =>{
					this.emergencyPlanList = res.data;
				});
			},
			showDialog(type){
				this.dialogVisible = true;
				this.editorType = true;
				if(type == '编辑'){
					this.dialog.title = type;
				}
				if(type == '添加'){
					this.dialog.title = type;
				}
			},
			showBack(data){
				this.showDialog('编辑');
				this.dialog.form.title = data.NAME;
				this.getContent(data.ID);
			},
			getContent(id){
				this.dialog.form.nowId = id;
				const baseURL = this.baseURL;
				axios.get('Yjzh/getContent',{
					baseURL:baseURL,
					params:{
						table:'TB_YJZH_FLFG',
						id:id
					}
				}).then(res =>{
					this.showInfo.content = res.data[0].CONTENT;
					this.sonContent = res.data[0].CONTENT;
					if(this.editorType){
						this.$refs.wangEditor.addText(res.data[0].CONTENT);
					}
				})
			},
			submitInfo(){
				const baseURL = this.baseURL;
				if(this.dialog.title == '编辑'){
					const params = new URLSearchParams();
					params.append('table','TB_YJZH_FLFG');
					params.append('id',this.dialog.form.nowId);
					params.append('name',this.dialog.form.title);
					params.append('content',this.editor);
					axios.post('Yjzh/editContent',params,{baseURL}).then(res =>{
						this.dialogVisible = false;
					});
				}
				if(this.dialog.title == '添加'){
					const params = new URLSearchParams();
					params.append('table','TB_YJZH_FLFG');
					params.append('name',this.dialog.form.title);
					params.append('content',this.editor);
					axios.get('Yjzh/saveContent',{
						baseURL:baseURL,
						params:{
							table:'TB_YJZH_FLFG',
							name:this.dialog.form.title,
							content:this.editor
						}
					}).then(res =>{
						this.dialogVisible = false;
					})
				}
			},
			handleClose(){
				this.dialogVisible = false;
				this.$refs.wangEditor.clearTexr();
				this.editor = null;
				this.dialog.form.title = '';
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import "../../../assets/css/emergencyPlan";
	.dataListPanel.center .header[data-v-6b925202]{
		padding-bottom: 5px;
	}
</style>
