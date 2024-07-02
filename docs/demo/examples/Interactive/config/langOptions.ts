import { LangOption } from "../types";
export const LANG_OPTIONS: LangOption[] = [
  {
    value: "javascript",
    label: "javascript",
    langPath: "codemirror/mode/javascript/javascript.js",
    code: `function findSequence(goal) {
  function find(start, history) {
    if (start == goal)
      return history;
    else if (start > goal)
      return null;
    else
      return find(start + 5, "(" + history + " + 5)") ||
             find(start * 3, "(" + history + " * 3)");
  }
  return find(1, "1");
}
`,
  },
  // json
  {
    langPath: "codemirror/mode/javascript/javascript.js",
    value: "json",
    label: "json",
    code: `{
      "compilerOptions": {
        "baseUrl": ".",
        "outDir": "temp",
        "sourceMap": false,
        "target": "es2016",
        "newLine": "LF",
        "useDefineForClassFields": false,
        "module": "esnext",
        "moduleResolution": "bundler",
        "allowJs": true,
        "strict": true,
        "noUnusedLocals": true,
        "experimentalDecorators": true,
        "resolveJsonModule": true,
        "isolatedModules": true,
        "skipLibCheck": true,
        "esModuleInterop": true,
        "removeComments": false,
        "jsx": "preserve",
        "lib": ["es2016", "dom"],
        "types": ["vitest/globals", "puppeteer", "node"],
        "rootDir": ".",
        "paths": {
          "@vue/compat": ["packages/vue-compat/src"],
          "@vue/*": ["packages/*/src"],
          "vue": ["packages/vue/src"]
        }
      },
      "include": [
        "packages/global.d.ts",
        "packages/*/src",
        "packages/runtime-dom/types/jsx.d.ts",
        "packages/*/__tests__",
        "packages/dts-test",
        "packages/vue/jsx-runtime",
        "scripts/*",
        "rollup.*.js"
      ]
    }`,
  },
  {
    langPath: "codemirror/mode/css/css.js",
    value: "css",
    label: "css",
    code: `/* Some example CSS */

    @import url("something.css");

    body {
      margin: 0;
      padding: 3em 6em;
      font-family: tahoma, arial, sans-serif;
      color: #000;
    }

    #navigation a {
      font-weight: bold;
      text-decoration: none !important;
    }`,
  },
  {
    langPath: "codemirror/mode/htmlmixed/htmlmixed.js",
    value: "text/html",
    label: "html",
    code: `<html style="color: green">
    <!-- this is a comment -->
    <head>
      <title>Mixed HTML Example</title>
      <style>
        h1 {font-family: comic sans; color: #f0f;}
        div {background: yellow !important;}
        body {
          max-width: 50em;
          margin: 1em 2em 1em 5em;
        }
      </style>
    </head>
    <body>
      <h1>Mixed HTML Example</h1>
      <script>
        function jsFunc(arg1, arg2) {
          if (arg1 && arg2) document.body.innerHTML = "achoo";
        }
      </script>
    </body>
  </html>
  `,
  },
  {
    langPath: "codemirror/mode/apl/apl.js",
    value: "text/apl",
    label: "apl",
    code: `⍝ Conway's game of life

⍝ This example was inspired by the impressive demo at
⍝ http://www.youtube.com/watch?v=a9xAKttWgP4

⍝ Create a matrix:
⍝     0 1 1
⍝     1 1 0
⍝     0 1 0
creature ← (3 3 ⍴ ⍳ 9) ∈ 1 2 3 4 7   ⍝ Original creature from demo
creature ← (3 3 ⍴ ⍳ 9) ∈ 1 3 6 7 8   ⍝ Glider

⍝ Place the creature on a larger board, near the centre
board ← ¯1 ⊖ ¯2 ⌽ 5 7 ↑ creature

⍝ A function to move from one generation to the next
life ← {∨/ 1 ⍵ ∧ 3 4 = ⊂+/ +⌿ 1 0 ¯1 ∘.⊖ 1 0 ¯1 ⌽¨ ⊂⍵}

⍝ Compute n-th generation and format it as a
⍝ character matrix
gen ← {' #'[(life ⍣ ⍵) board]}

⍝ Show first three generations
(gen 1) (gen 2) (gen 3)
`,
  },
  // sql
  {
    langPath: "codemirror/mode/sql/sql.js",
    value: "text/x-sql",
    label: "sql",
    code: `SELECT SQL_NO_CACHE DISTINCT
    @var1 AS \`val1\`, @'val2', @global.'sql_mode',
    1.1 AS \`float_val\`, .14 AS \`another_float\`, 0.09e3 AS \`int_with_esp\`,
    0xFA5 AS \`hex\`, x'fa5' AS \`hex2\`, 0b101 AS \`bin\`, b'101' AS \`bin2\`,
    DATE '1994-01-01' AS \`sql_date\`, { T "1994-01-01" } AS \`odbc_date\`,
    'my string', _utf8'your string', N'her string',
    TRUE, FALSE, UNKNOWN
FROM DUAL
-- space needed after '--'
# 1 line comment
/* multiline
comment! */
LIMIT 1 OFFSET 0;
`,
  },
  {
    langPath: "codemirror/mode/yaml/yaml.js",
    value: "text/x-yaml",
    label: "yaml",
    code: `--- # Favorite movies
    - Casablanca
    - North by Northwest
    - The Man Who Wasn't There
    --- # Shopping list
    [milk, pumpkin pie, eggs, juice]
    --- # Indented Blocks, common in YAML data files, use indentation and new lines to separate the key: value pairs
      name: John Smith
      age: 33
    --- # Inline Blocks, common in YAML data streams, use commas to separate the key: value pairs between braces
    {name: John Smith, age: 33}
    ---
    receipt:     Oz-Ware Purchase Invoice
    date:        2007-08-06
    customer:
        given:   Dorothy
        family:  Gale

    items:
        - part_no:   A4786
          descrip:   Water Bucket (Filled)
          price:     1.47
          quantity:  4

        - part_no:   E1628
          descrip:   High Heeled "Ruby" Slippers
          size:       8
          price:     100.27
          quantity:  1

    bill-to:  &id001
        street: |
                123 Tornado Alley
                Suite 16
        city:   East Centerville
        state:  KS

    ship-to:  *id001

    specialDelivery:  >
        Follow the Yellow Brick
        Road to the Emerald City.
        Pay no attention to the
        man behind the curtain.
    ...`,
  },
  // java
  {
    langPath: "codemirror/mode/clike/clike.js",
    value: "text/x-java",
    label: "java",
    code: `import com.demo.util.MyType;
import com.demo.util.MyInterface;

public enum Enum {
  VAL1, VAL2, VAL3
}

public class Class<T, V> implements MyInterface {
  public static final MyType<T, V> member;

  private class InnerClass {
    public int zero() {
      return 0;
    }
  }

  @Override
  public MyType method() {
    return member;
  }

  public void method2(MyType<T, V> value) {
    method();
    value.method3();
    member = value;
  }
}
`,
  },
  // c
  {
    langPath: "codemirror/mode/clike/clike.js",
    value: "text/x-csrc",
    label: "c",
    code: `/* C demo code */

#include <zmq.h>
#include <pthread.h>
#include <semaphore.h>
#include <time.h>
#include <stdio.h>
#include <fcntl.h>
#include <malloc.h>

typedef struct {
  void* arg_socket;
  zmq_msg_t* arg_msg;
  char* arg_string;
  unsigned long arg_len;
  int arg_int, arg_command;

  int signal_fd;
  int pad;
  void* context;
  sem_t sem;
} acl_zmq_context;

#define p(X) (context->arg_##X)

void* zmq_thread(void* context_pointer) {
  acl_zmq_context* context = (acl_zmq_context*)context_pointer;
  char ok = 'K', err = 'X';
  int res;

  while (1) {
    while ((res = sem_wait(&context->sem)) == EINTR);
    if (res) {write(context->signal_fd, &err, 1); goto cleanup;}
    switch(p(command)) {
    case 0: goto cleanup;
    case 1: p(socket) = zmq_socket(context->context, p(int)); break;
    case 2: p(int) = zmq_close(p(socket)); break;
    case 3: p(int) = zmq_bind(p(socket), p(string)); break;
    case 4: p(int) = zmq_connect(p(socket), p(string)); break;
    case 5: p(int) = zmq_getsockopt(p(socket), p(int), (void*)p(string), &p(len)); break;
    case 6: p(int) = zmq_setsockopt(p(socket), p(int), (void*)p(string), p(len)); break;
    case 7: p(int) = zmq_send(p(socket), p(msg), p(int)); break;
    case 8: p(int) = zmq_recv(p(socket), p(msg), p(int)); break;
    case 9: p(int) = zmq_poll(p(socket), p(int), p(len)); break;
    }
    p(command) = errno;
    write(context->signal_fd, &ok, 1);
  }
 cleanup:
  close(context->signal_fd);
  free(context_pointer);
  return 0;
}

void* zmq_thread_init(void* zmq_context, int signal_fd) {
  acl_zmq_context* context = malloc(sizeof(acl_zmq_context));
  pthread_t thread;

  context->context = zmq_context;
  context->signal_fd = signal_fd;
  sem_init(&context->sem, 1, 0);
  pthread_create(&thread, 0, &zmq_thread, context);
  pthread_detach(thread);
  return context;
}
`,
  },
  // c ++
  {
    langPath: "codemirror/mode/clike/clike.js",
    value: "text/x-c++src",
    label: "c++",
    code: `#include <iostream>
#include "mystuff/util.h"

namespace {
enum Enum {
  VAL1, VAL2, VAL3
};

char32_t unicode_string = U"\\U0010FFFF";
string raw_string = R"delim(anything
you
want)delim";

int Helper(const MyType& param) {
  return 0;
}
} // namespace

class ForwardDec;

template <class T, class V>
class Class : public BaseClass {
  const MyType<T, V> member_;

 public:
  const MyType<T, V>& Method() const {
    return member_;
  }

  void Method2(MyType<T, V>* value);
}

template <class T, class V>
void Class::Method2(MyType<T, V>* value) {
  std::out << 1 >> method();
  value->Method3(member_);
  member_ = value;
}
`,
  },
  // python
  {
    langPath: "codemirror/mode/python/python.js",
    value: "text/x-python",
    label: "python",
    code: `import os, sys
import MySQLdb
try:
    conn MySQLdb.connect(host=’localhost’,user=’root’,passwd=’’,db=’address’
except Exception,e:
    print e
    sys.exit()
cursor=conn.cursor()
sql=’insert into address(name, address) values(%s, %s)’
value=((“zhangsan”,”haidian”),(“lisi”,”haidian”))
try
    cursor.executemany(sql,values)
except Exception, e:
    print e
sql=”select * from address”
cursor.execute(sql)
data=cursor.fetchall()
if data
    for x in data:
        print x[0],x[1]
cursor.close()
conn.close()
`,
  },
  // go
  {
    langPath: "codemirror/mode/go/go.js",
    value: "text/x-go",
    label: "go",
    code: `// Prime Sieve in Go.
// Taken from the Go specification.
// Copyright © The Go Authors.

package main

import "fmt"

// Send the sequence 2, 3, 4, ... to channel 'ch'.
func generate(ch chan<- int) {
	for i := 2; ; i++ {
		ch <- i  // Send 'i' to channel 'ch'
	}
}

// Copy the values from channel 'src' to channel 'dst',
// removing those divisible by 'prime'.
func filter(src <-chan int, dst chan<- int, prime int) {
	for i := range src {    // Loop over values received from 'src'.
		if i%prime != 0 {
			dst <- i  // Send 'i' to channel 'dst'.
		}
	}
}

// The prime sieve: Daisy-chain filter processes together.
func sieve() {
	ch := make(chan int)  // Create a new channel.
	go generate(ch)       // Start generate() as a subprocess.
	for {
		prime := <-ch
		fmt.Print(prime, "\\n")
		ch1 := make(chan int)
		go filter(ch, ch1, prime)
		ch = ch1
	}
}

func main() {
	sieve()
}
`,
  },
  // php
  {
    // langPath: "codemirror/mode/clike/clike.js",
    langPath: "codemirror/mode/php/php.js",
    value: "text/x-php",
    label: "php",
    code: `<?php
$dbhost = 'localhost';  // mysql server host address
$dbuser = 'root';            // mysql username
$dbpass = '123456';          // mysql pwd
$conn = mysqli_connect($dbhost, $dbuser, $dbpass);
if(! $conn )
{
    die('connection failed: ' . mysqli_error($conn));
}

mysqli_query($conn , "set names utf8");

$sql = 'SELECT runoob_id, runoob_title,
        runoob_author, submission_date
        FROM runoob_tbl';

mysqli_select_db( $conn, 'RUNOOB' );
$retval = mysqli_query( $conn, $sql );
if(! $retval )
{
    die('Unable to read data: ' . mysqli_error($conn));
}
echo '<h2> mysqli_fetch_array test</h2>';
echo '<table border="1"><tr><td> ID</td><td>title</td><td>author</td><td>date</td></tr>';
while($row = mysqli_fetch_array($retval, MYSQLI_ASSOC))
{
    echo "<tr><td> {$row['runoob_id']}</td> ".
         "<td>{$row['runoob_title']} </td> ".
         "<td>{$row['runoob_author']} </td> ".
         "<td>{$row['submission_date']} </td> ".
         "</tr>";
}
echo '</table>';
mysqli_close($conn);
?>`,
  },
  // 更多语言正在添加中...
  {
    langPath: "",
    value: "moreLang",
    label: "More languages example are being added...",
    code: "",
    disabled: true,
  },
  {
    langPath: "",
    value: "langConfig",
    label: "Click to view more languages",
    code: "",
  },
];

export const DEFAULT_LANG_OPT = LANG_OPTIONS[0];
