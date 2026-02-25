#!/usr/bin/env bash
#(C)2019-2022 Pim Snel - https://github.com/mipmip/RUNME.sh
CMDS=();DESC=();NARGS=$#;ARG1=$1;make_command(){ CMDS+=($1);DESC+=("$2");};usage(){ printf "\nUsage: %s [command]\n\nCommands:\n" $0;line="              ";for((i=0;i<=$(( ${#CMDS[*]} -1));i++));do printf "  %s %s ${DESC[$i]}\n" ${CMDS[$i]} "${line:${#CMDS[$i]}}";done;echo;};runme(){ if test $NARGS -eq 1;then eval "$ARG1"||usage;else usage;fi;}

##### PLACE YOUR COMMANDS BELOW #####


make_command "gen_all_badges" "Generate all possible badges with all configuration variaties"
gen_all_badges(){
  # Check dependencies
  if ! command -v openspec &> /dev/null; then
    echo "Error: OpenSpec CLI not found. Install it with: npm install -g @fission-ai/openspec"
    exit 1
  fi

  if ! command -v node &> /dev/null; then
    echo "Error: Node.js not found. Please install Node.js."
    exit 1
  fi

  if [ ! -d "node_modules/badgen" ]; then
    echo "Error: badgen package not found. Install it with: npm install badgen"
    exit 1
  fi

  # Collect OpenSpec metrics
  echo "Collecting OpenSpec metrics..."
  SPECS_JSON=$(openspec spec list --json 2>/dev/null || echo "[]")
  SPEC_COUNT=$(echo "$SPECS_JSON" | node -p 'JSON.parse(require("fs").readFileSync(0,"utf8")).length')
  REQ_COUNT=$(echo "$SPECS_JSON" | node -p 'JSON.parse(require("fs").readFileSync(0,"utf8")).reduce((s,x)=>s+(x.requirementCount||0),0)')

  CHANGES_JSON=$(openspec list --changes --json 2>/dev/null | node -p 'JSON.stringify(JSON.parse(require("fs").readFileSync(0,"utf8")).changes || [])')
  OPEN_CHANGES=$(echo "$CHANGES_JSON" | node -p 'JSON.parse(require("fs").readFileSync(0,"utf8")).length')
  COMPLETED_TASKS=$(echo "$CHANGES_JSON" | node -p 'JSON.parse(require("fs").readFileSync(0,"utf8")).reduce((s,x)=>s+(x.completedTasks||0),0)')
  TOTAL_TASKS=$(echo "$CHANGES_JSON" | node -p 'JSON.parse(require("fs").readFileSync(0,"utf8")).reduce((s,x)=>s+(x.totalTasks||0),0)')

  echo "Specs: $SPEC_COUNT, Requirements: $REQ_COUNT, Changes: $OPEN_CHANGES, Tasks: $COMPLETED_TASKS/$TOTAL_TASKS"

  # Create output directory
  mkdir -p examples/badges

  # Generate all badge combinations
  echo "Generating badges..."

  for METRIC in number_of_specs number_of_requirements tasks_status open_changes; do
    for STYLE in classic flat; do
      for SHOW_LABEL in true false; do
        LABEL_SUFFIX=$([ "$SHOW_LABEL" = "true" ] && echo "labeled" || echo "unlabeled")
        STYLE_NAME=$([ "$STYLE" = "classic" ] && echo "classic" || echo "flat")

        # Friendly metric name for filename
        METRIC_SHORT=$(echo "$METRIC" | sed 's/number_of_specs/specs/; s/number_of_requirements/requirements/; s/tasks_status/tasks/; s/open_changes/changes/')

        OUTPUT_FILE="examples/badges/${METRIC_SHORT}_${STYLE_NAME}_${LABEL_SUFFIX}.svg"

        # Use the badge-generator.js script
        node scripts/badge-generator.js \
          --metric "$METRIC" \
          --spec-count "$SPEC_COUNT" \
          --req-count "$REQ_COUNT" \
          --open-changes "$OPEN_CHANGES" \
          --completed-tasks "$COMPLETED_TASKS" \
          --total-tasks "$TOTAL_TASKS" \
          --style "$STYLE" \
          --show-label "$SHOW_LABEL" \
          --output "$OUTPUT_FILE"
      done
    done
  done

  echo ""
  echo "Successfully generated 16 badge variants in examples/badges/"
  ls -lh examples/badges/
}



##### PLACE YOUR COMMANDS ABOVE #####

runme
