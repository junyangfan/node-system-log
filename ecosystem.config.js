module.exports = {
	apps: [
		{
			name: 'log-system',
			script: './main.js',
			watch: '.',
			error_file: '../pm2logs/pm2-err.log',
			out_file: '../pm2logs/pm2-out.log',
			merge_logs: true,
			log_date_format: 'YYYY-MM-DD HH:mm:ss',
			ignore_watch: ['node_modules', 'logs', 'systemLog'],
		},
	],
};
