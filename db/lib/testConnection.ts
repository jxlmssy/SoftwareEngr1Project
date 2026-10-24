const { createClient } = require('@supabase/supabase-js')

const supabase = createClient(
  'https://bighdlkcvzupgdruhtpe.supabase.co',
  'sb_publishable_2xxw3jZiiKXq2WPxAQA5QQ_A1fsFUFB'
)

async function testConnection() {
  const { data, error } = await supabase
    .from('app_users')
    .select('*')

  console.log('DATA:', data)
  console.log('ERROR:', error)
}

testConnection()