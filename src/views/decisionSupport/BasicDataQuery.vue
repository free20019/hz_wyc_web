<!--基础数据查询-->
<template>
	<div class="tw-template-wrapper">
		<el-form class="tw-query-bar" :model="query" :inline="true" size="small"></el-form>
		<div class="tw-query-panel">基础数据查询</div>
	</div>
</template>

<script>
	export default {
		name: "BasicDataQuery",
		data() {
			return {
				query: {}
			}
		}
	}
</script>

<style scoped>

</style>