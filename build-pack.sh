
#| sort | uniq
# if [ "$1" != "-up" ]; then
#npm version patch
# npm -v
# fi
echo 'To run build-pack enter password.'
sudo rm -rf /dist
echo 'start build'
npm run build
echo 'build done'
echo
echo 'start pack'
npm pack
echo 'pack done'