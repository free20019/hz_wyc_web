<!--车辆运行统计-->
<template>
	<div class="tw-template-wrapper">
		<el-form class="tw-query-bar" :model="query" :inline="true" size="small"></el-form>
		<div class="tw-query-panel">车辆运行统计</div>
	</div>
</template>

<script>
	export default {
		name: "VehicleOperationStatistics",
		data() {
			return {
				query: {}
			}
		}
	}
</script>

<style scoped>

</style>