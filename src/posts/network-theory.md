---
title: Visualization of network theory for mental disorders
date: 2024-12-09
updated: 2024-12-11
categories:
  - Research
description: 
published: false
ToC: false
---

<script>
  import HysteresisLoop from '$lib/posts/network_theory/HysteresisLoop.svelte';
  import NetworkPtsdTherapy from '$lib/posts/network_theory/NetworkPtsdTherapy.svelte';
  import NetworkPtsdCommonCauses from '$lib/posts/network_theory/NetworkPtsdCommonCauses.svelte';
  import MultilayerNetwork from '$lib/posts/network_theory/MultilayerNetwork.svelte';
  import NetworkPtsdClustered from '$lib/posts/network_theory/NetworkPtsdClustered.svelte';
  import NetworkPtsdExternal from '$lib/posts/network_theory/NetworkPtsdExternal.svelte';
  import NetworkPtsd from '$lib/posts/network_theory/NetworkPtsd.svelte';
  import NomenclatureExamples from '$lib/posts/network_theory/NomenclatureExamples.svelte';
  import Nomenclature from '$lib/posts/network_theory/Nomenclature.svelte';
  import ViciousCircle from '$lib/posts/network_theory/ViciousCircle.svelte';
  import LatentPtsdTreated from '$lib/posts/network_theory/LatentPtsdTreated.svelte';
  import LatentPtsd from '$lib/posts/network_theory/LatentPtsd.svelte';
  import LatentCausality from '$lib/posts/network_theory/LatentCausality.svelte';
  import LatentCancerTreated from '$lib/posts/network_theory/LatentCancerTreated.svelte';
  import NetworkTable from '$lib/posts/network_theory/NetworkTable.svelte';
</script>

Network theory offers a fundamental shift in how we understand mental disorders: rather than viewing them as discrete conditions with invisible underlying causes, it conceptualizes them as ever-changing networks of interacting symptoms, emotions, behaviors and traits [^1]. It is both a departure from and an extension to the 'common cause' model (also known as the latent disease model). In the common cause model, which underlies classification systems like DSM-5 and ICD-10, symptoms are viewed as mere consequences of an underlying disorder — like depression or anxiety — without causal relationships between symptoms. This has shaped psychiatry and psychology ever since the conception of the DSM-III in 1980 [^2]. Network theory, in contrast, proposes that mental disorders are macroscopic states that emerge from a complex web of causal interactions between symptoms, situated in a person, situated in the world. Symptoms aren't mere consequences of the disorder, *they constitute it* [^3]. 

As a discipline, network theory is far from new. It can be situated in a much broader field known as [complexity science](https://en.wikipedia.org/wiki/Complex_system), which has crossed paths with cognitive neuroscience, ecology, sociology, economics, computer science, epidemiology, and more. The study of complex systems has taken many forms throughout the 20th century: from [game theory](https://en.wikipedia.org/wiki/Game_theory), to [cybernetics](https://en.wikipedia.org/wiki/Cybernetics), to [chaos theory](https://en.wikipedia.org/wiki/Chaos_theory), all the way to modern [systems biology](https://en.wikipedia.org/wiki/Systems_biology) and network science. And mental health care professionals aren't entirely unfamiliar with complex systems thinking either - conceptual models that are widely used in clinical practice, such as the [biopsychosocial model](https://en.wikipedia.org/wiki/Biopsychosocial_model) and the [diathesis-stress model](https://en.wikipedia.org/wiki/Diathesis%E2%80%93stress_model), already emphasize the interplay between different factors in mental health. What network theory adds is a mathematical framework that transforms these abstract ideas into testable models, opening up new possibilities for understanding and treating mental disorders. 

In this post, I'll explain how viewing mental disorders as networks of interacting symptoms challenges traditional models of psychopathology. Because complexity writing turns into word salad really quickly, I sought to use diagrams to support the text. In a future post, I plan on demonstrating these concepts with real data analysis.

## The 'Common Cause' Model in Medicine

The 'common cause' model has its origins in medicine. It is based on the idea that symptoms are clues for an underlying disease and it's also known as the *latent cause model*. Take the example of someone who has cancer. They may lose weight and feel tired because they have a tumor that consumes all their energy. In similar fashion, they are in pain because they have a tumor that puts pressure on surrounding tissues. The pain may have some effect on their energy levels, but it's mostly the tumor causing both. The tumor's existence is indisputable. We know it exists because imaging or pathology confirmed it. If the patient receives chemotherapy and their symptoms wane, but medical imaging shows that the tumor is still there, albeit smaller, they are still said to have cancer. The latent cause is still present.

<LatentCancerTreated/>


## The 'Common Cause' Model in Psychopathology

Widely used classification systems like the DSM-V or ICD-10 are also grounded in the 'common cause' model. They assume that symptoms are manifestations of an unobserved construct such as major depressive disorder, generalized anxiety disorder, or post-traumatic stress disorder. To qualify for such a disorder, someone might need to have "5 out of 9 symptoms". The exact symptoms are interchangeable, and interactions among symptoms are irrelevant. Symptoms are mere consequences of the 'common cause' that don't possess any causal power themselves. Let's take a look at post-traumatic stress disorder (PTSD) to see how that works out in practice.

<LatentPtsd/>

In this view, PTSD is conceptualized as a "thing" that is there, which gives rise to all of the above symptoms. These symptoms are mere clues that hint at the presence of PTSD as their shared underlying cause. It is well-known that people usually have more than one classification. It is not hard to model how multiple classifications are purported to interact within the common cause model. We can safely ignore the symptoms. 

<LatentCausality/>

Let's go back to our 'common cause' view of PTSD. Parallel to the person with *cancer*, our client has also received treatment in the form of therapy. They report not having had any meaningful symptoms for the past month. Can we still say they have PTSD?

<LatentPtsdTreated/>

The answer is no. At least not currently. Of course, they may be more susceptible than others to have symptoms return, but there is no basis on which to say they currently have PTSD. Without symptoms, there is no disorder. <em>Symptoms do not reflect a mental disorder: they constitute it.</em>

This reveals a major flaw in the common cause model: if PTSD is only there if the symptoms are, then PTSD cannot be the cause of the symptoms. A cause must exist independently of its effects - it cannot be defined by the presence of those effects. The common cause model thus contains circular logic: it claims PTSD causes the symptoms, yet PTSD is defined by the presence of those very symptoms.

And that's not the only problem with the common cause model for psychopathology. Decades of research into the origins of mental disorders have not found causal mechanisms that justify the existence of 'common causes'. In addition, real people cannot be confined to the rigid categories that classification systems impose, to the point where more than half of clients have received two or more classifications at a time [^4]. 

People have written extensively about the shortcomings of traditional categorical classification systems, and for risk of repeating what others have already said better, I think it is time to discuss why symptoms deserve a more prominent role. 

The common cause view does not account for several facts that are seen as self-evident by many: (1) symptoms can cause other symptoms, (2) symptoms change over time, (3) symptoms don't care about classifications. 

In reality, symptoms occur in self-reinforcing patterns and cycles. 

<ViciousCircle/>

We don't need a common cause to explain what is happening here. We can just let symptoms cause other symptoms. The resulting self-sustaining entity is enough to serve as a basis for understanding psychopathology. 

## Understanding mental disorders as networks

### Basic terminology

To make the move from vicious cycles to full-blown networks, it is time to introduce some terminology. 

<Nomenclature/>

**Nodes**, or elements, can be symptoms, emotions, behaviors, or traits. Nodes are causal agents that influence other nodes.

**Edges** are connections between nodes, that take the form of *lines*. 

An edge always has at least these two properties: 
1. a strength, indicated by the edge's width or thickness, and
2. a <span style="color:#009951; font-weight: 500">positive</span> or <span style="color:#C00F0D; font-weight: 500">negative</span> *valence*. 

Optionally, edges can have a third property: *direction*, as indicated by the arrowhead. Whether a node is directional depends on the type of network (more on that in the next bit). 

**Path**: any trajectory along a graph.

**Cluster**: a group of nodes that are more densely connected than other parts in the graph.

**Graph**: a different name for a network, commonly used in mathematics.

### Contemporaneous vs. Temporal networks

At this point, it is important to introduce the distinction between *temporal* networks and *contemporaneous* networks.  

Contemporaneous means as much as "at the same time". To construct a contemporaneous network, we look for co-occurrence patterns between pairs of symptoms within each data point. If two symptoms frequently occur together, they are correlated and we draw an edge between them. This leads to *undirected* edges, because although these patterns may be robust, we don't know which symptom causes which.

In contrast, temporal networks are all about patterns of change over time. Instead of looking for co-occurrence patterns within each data point, we look for co-occurrence patterns from one data point to the next. If one symptom repeatedly happens before another, we can say they are temporally related. Because time is a one-way street, we can draw an arrow from the first to the second symptom. This leads to *directed* edges, indicating the passage of time (it does not imply causality). Usually, temporal networks use a so-called *lag* of 1, meaning we look at the relationship between symptoms at time t and t+1. A lag of 2 would mean we look at the relationship between symptoms at time t and t+2.

<NetworkTable/>

In this example, we can see clear co-occurrence patterns:
- Insomnia and Fatigue frequently occur together (P1, P2, P4, P6)
- Anxiety and Sadness sometimes co-occur (P3)
- Some people have multiple symptoms (P1, P4)
- Others have single symptoms (P5)

These patterns would result in stronger edges between frequently co-occurring symptoms (like Insomnia-Fatigue) in the network.
For example, a negative edge between “social support” and “depression” nodes might indicate that higher levels of social support tend to reduce depressive symptoms. Conversely, a strong positive edge between “insomnia” and “fatigue” nodes would suggest that increased insomnia is likely to lead to increased fatigue.

<NomenclatureExamples/>

## A toy network model for PTSD

Remember the 'common cause' model that showed PTSD, substance use and emotion dysregulation? 

<LatentCausality/>

Let's see if we can conceive of an imaginary network model for similar constructs, without relying on the notion of common causes.  

<NetworkPtsd/>

All symptoms are now causal agents that can influence each other. Some edges are positive, meaning they lead to more of the node they point to, some are negative. Some have strong effects, some weak. Some are bidirectional (e.g. insomnia and alcohol use), others are in a positive feedback loop with themselves (e.g., negative affect). 

<NetworkPtsdExternal/>

The network is not a solitary entity, it is part of the broader set of cognitions, feelings and behaviours that occur within that person. In addition, that person is situated within a social context. All elements that aren't part of the psychopathology network, but influence it nonetheless, is called the **external field**. 

Although we aren't fans of discrete categories, we create structure for ourselves by assigning symptoms to broad *transdiagnostic* clusters: trauma, substance use, and emotion dysregulation. Notice that they are allowed to overlap with each other.

<NetworkPtsdClustered/>

So far we have only discussed psychological symptoms, but it is possible to include the entire [biopsychosocial model](https://en.wikipedia.org/wiki/Biopsychosocial_model). The way to do this is heavily dependent on your philosophical point of departure. Some have proposed that, since psychological factors arise out of biological factors, a network should really have multiple layers [^5]. 

<MultilayerNetwork/>

Perhaps you expected vertical arrows to connect the two layers, that that be an erroneous simplification of reality. The biological level and the psychological level are like different levels of resolution. Zoom out from the biological level and psychological factors arise. Their relation is not simple and linear. What you observe on the psychological level has arisen out of the biological level. They are [emergent](https://en.wikipedia.org/wiki/Emergence) phenomena of the lower, biological level. Conversely, psychological phenomena can influence biological factors. 

Network theory can co-exist with the 'common cause' model. For example, one could imagine positioning insecure attachment during early childhood as an overarching element that exerts an influence on most elements in a network. Or personality style, such as being high in trait neuroticism. Or, in the case of highly genetically determined disorders such as psychotic disorders, a positive family history or known genetic abnormalities. These would all be part of the external field. 

<NetworkPtsdCommonCauses/>

This brings us to a very important aspect of network theory: **time**. All networks that we have seen so far are snapshots of either an (imaginary) point in time, or they could be averaged over a period of time. If we would capture how our network changed over the course of seconds, minutes, weeks, years, we would see edges and nodes appear and disappear, get stronger then wean into nothingness. Some clusters would be more stable than others. Suicidal thoughts are known to vary a lot. One day someone may be actively contemplating suicide, the next day they may be wholly distracted from the topic. Other parts of the network tend to be more stable. 

Mental disorders are, by definition, **stable states of dynamic networks**. This means they are good at resisting perturbations from outside the network. Otherwise they wouldn't have still been there. 

<NetworkPtsdTherapy/>

In fact, therapy could be conceptualized as an external field element that sets out to *perturb* the mental disorder's stable state. 


But behold, even if a stressor is removed, because life changed or perhaps because of therapy, it may not mean the network can return to a healthy state. That may be the case if the alternative state is so resilient as to persist even in absence of the stressor that caused it. This principle is known as **hysteresis**. 

<HysteresisLoop/>

Shown above is a *hysteresis loop* along the course of someone's lifetime. On the x-axis sits *symptom severity*, as the average of the severity of all the symptom's this person is experiencing. On the y-axis is the level of *psychosocial stress* the person is going through. Tracing the line, we start at birth. Perhaps prenatal stressors influence the symptom severity at this point. Perhaps things went wrong with attachment. Soon enough, we arrive in early childhood, where they experience several adverse events (e.g., the death of a parent, abuse), leading to a further increase in symptom severity. At some point as an adult, they start going to therapy. A while later, they find a partner and a stable family life. After some years, symptom severity starts decreasing for the first time in their life. This is where *hysteresis* comes in, because the trajectory the line follows is *a different one from the path it took to get there*. We cannot simply trace the line backwards to zero. 

This has several important clinical implications. It helps explain:
1. Why change takes time, even after removing stressors;
2. Why maintaining recovery is often harder than achieving it initially;
3. Why treatment should focus on building new stable patterns of functioning rather than just removing stressors.

## Nothing new under the sun

Network theory is not a new idea. The intuition that symptoms can cause each other is as old as the hills. What is new is the formalization of this intuition into a mathematical framework. This allows us to make predictions about how symptoms will change over time, how they will respond to interventions, and how they will interact with each other. Colleagues brought to my attention the existence of the Neuman system model. This model is a conceptual framework that views the individual as an open system that interacts with the environment. It is used in nursing to guide patient care.

## A real example 

## Further learning
- Eiko Fried YouTube lecture
- Olthoff's 2020 paper
- Cognitive science as complexity science

> ::IMPORTANT Not an expert
> This post is an attempt at explaining network theory to an audience, but also to myself. I am not a researcher in this field, and I am open to learning from mistaktes. Noticed inaccuracies or mistakes? Send me an email!


[^1]: Reeves, J. W., & Fisher, A. J. (2020). _An examination of idiographic networks of posttraumatic stress disorder symptoms_. [https://doi.org/10.1002/jts.22491](https://doi.org/10.1002/jts.22491)
[^2]: Borgogna, N. C., Owen, T., & Aita, S. L. (2024). The absurdity of the latent disease model in mental health: 10,130,814 ways to have a DSM-5-TR psychological disorder. _Journal of Mental Health_, _33_(4), 451–459. [https://doi.org/10.1080/09638237.2023.2278107](https://doi.org/10.1080/09638237.2023.2278107)
[^3]: Roefs, A., Fried, E. I., Kindt, M., Martijn, C., Elzinga, B., Evers, A. W. M., Wiers, R. W., Borsboom, D., & Jansen, A. (2022). A new science of mental disorders: Using personalised, transdiagnostic, dynamical systems to understand, model, diagnose and treat psychopathology. _Behaviour Research and Therapy_, _153_, 104096. [https://doi.org/10.1016/j.brat.2022.104096](https://doi.org/10.1016/j.brat.2022.104096)
[^4]: Cramer, A. O. J., Waldorp, L. J., van der Maas, H. L. J., & Borsboom, D. (2010). Comorbidity: A network perspective. Behavioral and Brain Sciences, 33, 137–193. https://doi.org/10.1017/s0140525x09991567
[^5]: Riese, H., & Wichers, M. (2021). Comment on: Eronen MI (2019). The levels problem in psychopathology. _Psychological Medicine_, _51_(3), 525–526. [https://doi.org/10.1017/S0033291719003623](https://doi.org/10.1017/S0033291719003623)
