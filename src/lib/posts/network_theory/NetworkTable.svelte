<script lang="ts">
    import * as Table from "$lib/shadcn/ui/table";
    import { Button } from "$lib/shadcn/ui/button";
    
    let viewMode = 'contemporaneous';
    let highlighted = ['insomnia', 'fatigue'];  // Start with contemporaneous
  
    const data = [
      { person: 'P1', insomnia: 1, fatigue: 1, anxiety: 1, sadness: 0 },
      { person: 'P2', insomnia: 1, fatigue: 1, anxiety: 0, sadness: 0 },
      { person: 'P3', insomnia: 0, fatigue: 0, anxiety: 1, sadness: 1 },
      { person: 'P4', insomnia: 1, fatigue: 1, anxiety: 1, sadness: 0 },
      { person: 'P5', insomnia: 0, fatigue: 0, anxiety: 0, sadness: 1 },
      { person: 'P6', insomnia: 1, fatigue: 1, anxiety: 0, sadness: 0 }
    ];

    function setContemporaneous() {
        viewMode = 'contemporaneous';
        highlighted = ['insomnia', 'fatigue'];
    }

    function setTemporal() {
        viewMode = 'temporal';
        highlighted = ['anxiety', 'sadness'];
    }
</script>

<div class="space-y-4">
    <div class="flex gap-4">
      <Button 
        on:click={setContemporaneous}
        class={viewMode === 'contemporaneous' ? 'bg-primary' : 'bg-secondary'}
      >
        Show Contemporaneous Relationship
      </Button>
      <Button 
        on:click={setTemporal}
        class={viewMode === 'temporal' ? 'bg-primary' : 'bg-secondary'}
      >
        Show Temporal Relationship
      </Button>
    </div>

    <Table.Root>
      <Table.Caption>
        {#if viewMode === 'contemporaneous'}
          Highlighting co-occurrence of Insomnia and Fatigue (same time point)
        {:else}
          Highlighting potential temporal relationship between Anxiety and Sadness
        {/if}
      </Table.Caption>
      
      <Table.Header>
        <Table.Row>
          <Table.Head>Person</Table.Head>
          <Table.Head>Insomnia</Table.Head>
          <Table.Head>Fatigue</Table.Head>
          <Table.Head>Anxiety</Table.Head>
          <Table.Head>Sadness</Table.Head>
        </Table.Row>
      </Table.Header>
      
      <Table.Body>
        {#each data as row}
          <Table.Row>
            <Table.Cell>{row.person}</Table.Cell>
            <Table.Cell class={highlighted.includes('insomnia') && row.insomnia ? 'bg-green-100' : ''}>
              {row.insomnia}
            </Table.Cell>
            <Table.Cell class={highlighted.includes('fatigue') && row.fatigue ? 'bg-green-100' : ''}>
              {row.fatigue}
            </Table.Cell>
            <Table.Cell class={highlighted.includes('anxiety') && row.anxiety ? 'bg-green-100' : ''}>
              {row.anxiety}
            </Table.Cell>
            <Table.Cell class={highlighted.includes('sadness') && row.sadness ? 'bg-green-100' : ''}>
              {row.sadness}
            </Table.Cell>
          </Table.Row>
        {/each}
      </Table.Body>
    </Table.Root>
</div>