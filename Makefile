VERSION=0.0.1
DEV=build/waypoint-$(VERSION).js
PROD=build/waypoint-$(VERSION).min.js

build:
	echo "Development: $(DEV)"
	echo "Production: $(PROD)"

	cat src/waypoint.js > $(DEV)

	curl -s \
		-d compilation_level=SIMPLE_OPTIMIZATIONS \
		-d output_format=text \
		-d output_info=compiled_code \
		--data-urlencode "js_code@${DEV}" \
		http://closure-compiler.appspot.com/compile \
		> $(PROD)

.PHONY: build