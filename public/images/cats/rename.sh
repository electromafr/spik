#!/bin/bash
j=0
for f in *.jpg
do
  mv $f $j.jpg
  j=$(($j + 1))
done
