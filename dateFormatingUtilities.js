import moment from 'moment'

export function formatDate(x)
{
	x = x*1000
	return moment(x).format("ha")
}

export function formatMainDate(x)
{
	x = x.toString()
	return x.slice(0, 15)
}

export function formatSearchDate(x)
{
	x = x.toString()
	return x.slice(0, 15)
}