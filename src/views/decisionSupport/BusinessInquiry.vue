<!--经营业务查询-->
<template>
	<div class="tw-template-wrapper">
		<el-form class="tw-query-bar" :model="query" :inline="true" size="small"></el-form>
		<div class="tw-query-panel">经营业务查询</div>
	</div>
</template>

<script>
	export default {
		name: "BusinessInquiry",
		data() {
			return {
				query: {}
			}
		}
	}
</script>

<style scoped>

</style>